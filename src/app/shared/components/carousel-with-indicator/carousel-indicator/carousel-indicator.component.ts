import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

class Indicator {
  constructor(public ref: number) {}
}

@Component({
  selector: 'app-carousel-indicator',
  templateUrl: './carousel-indicator.component.html',
  styleUrls: ['./carousel-indicator.component.scss'],
})
export class CarouselIndicatorComponent implements OnChanges {
  @Input() current: number = 0;
  @Input() length: number = 0;
  indicators: Indicator[] = [];

  private MAX_VISIBLE_INDICATORS = 4;
  private min = 0;
  private max = this.MAX_VISIBLE_INDICATORS;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDots(changes);
  }

  changeDots(changes: any) {
    const changeLenght = changes.length;
    if (changeLenght) {
      for (
        let i = changeLenght.previousValue || 0;
        i < changeLenght.currentValue;
        i++
      ) {
        this.indicators.push(new Indicator(i));
      }
    }
    const chCurrent = changes.current;
    if (chCurrent) {
      if (chCurrent.currentValue < this.min) {
        this.min = chCurrent.currentValue;
        this.max = this.min + this.MAX_VISIBLE_INDICATORS;
        if (this.max > this.length) {
          this.max = this.length;
        }
      }
      if (chCurrent.currentValue > this.max) {
        this.max = chCurrent.currentValue;
        this.min = this.max - this.MAX_VISIBLE_INDICATORS;
        if (this.min < 0) {
          this.min = 0;
        }
      }
    }
  }

  getIndicatorClass(ref: number): string {
    if (ref === this.current) {
      return 'active';
    }
    if (ref >= this.min && ref <= this.max) {
      return 'std';
    }
    if (ref === this.min - 1 || ref === this.max + 1) {
      return 'small';
    }
    if (ref === this.min - 2 || ref === this.max + 2) {
      return 'micro';
    }
    return 'hidden';
  }
}
