import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselIndicatorComponent } from './carousel-indicator/carousel-indicator.component';
import { CarouselWithIndicatorComponent } from './carousel-with-indicator.component';

@NgModule({
  declarations: [CarouselIndicatorComponent, CarouselWithIndicatorComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [CarouselIndicatorComponent, CarouselWithIndicatorComponent],
  providers: [CarouselIndicatorComponent],
})
export class CarouselWithIndicatorModule {}
