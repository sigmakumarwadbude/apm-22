import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  imports: [],
  template: `<div class="crop text-center" [style.width.px]="cropWidth" [title]="rating" (click)="onClick()">
    <div style="width: 75px">
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
    </div>
  </div>`,
  styles: [
    `
      .crop {
        overflow: hidden;
      }
      div {
        cursor: pointer;
      }
    `,
  ],
})
export class Star implements OnChanges {
  @Input() rating = 4;
  cropWidth = 75;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>()

  ngOnChanges(changes: SimpleChanges): void {
    this.cropWidth = (this.rating * 75) / 5;
  }

  onClick() {
    this.ratingClicked.emit(`rating clicked ${this.rating}`);
  }
}
