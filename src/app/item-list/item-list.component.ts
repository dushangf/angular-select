import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input() data: any;
  @Input() handleItemSelect: any;
  @Input() onScrollEnd: any;

  handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (target.scrollTop === target.scrollHeight - target.clientHeight) {
      this.onScrollEnd();
    }
  }

  onItemSelect(e: any) {
    this.handleItemSelect(e)
  }

  ngOnInit() {}

  ngAfterViewInit() {}
}
