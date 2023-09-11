import { Component, ElementRef, Renderer2 } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}
  title = 'angular-select';
  data: any = [];
  currentValue: any = {};
  currentLabel: string = '';
  searchValue: string = '';
  listStatus: boolean = false;
  currentPage: number = 1;
  pendingData: boolean = false;

  async getData(page?: number, search?: string) {
    const res = await axios.get(
      `https://api.punkapi.com/v2/beers?page=${String(page)}&per_page=10`
    );

    return res.data.map((item: any) => ({
      label: item.name,
      value: item,
    }));
  }

  handleSearch(e: any) {
    this.currentLabel = e.target.value;
    this.searchValue = e.target.value;
    this.currentPage = 1;
    this.getData(this.currentPage, this.searchValue);
  }

  handleItemSelect(e: any) {
    console.log('item selection working');
    console.log(e);
    this.currentValue = e.value;
    this.currentLabel = e.label;
  }

  onScrollEnd() {
    this.currentPage++;
    this.getData(this.currentPage, this.searchValue).then((data) => {
      this.pendingData = false;
      this.data = [...this.data, ...data];
    });
  }

  handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (target.scrollTop === target.scrollHeight - target.clientHeight) {
      this.pendingData = true;
      this.onScrollEnd();
    }
  }

  toggleList(status: boolean) {
    this.listStatus = status;
  }

  ngOnInit() {
    this.getData(1, '').then((data) => (this.data = data));
  }
}
