import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselWithTouchComponent } from './carousel-with-touch.component';

@NgModule({
  declarations: [CarouselWithTouchComponent],
  imports: [CommonModule],
  exports: [CarouselWithTouchComponent],
})
export class CarouselWithTouchModule {}
