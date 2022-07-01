import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselContainerComponent } from './carousel-container.component';

@NgModule({
  declarations: [CarouselContainerComponent],
  imports: [CommonModule],
  exports: [CarouselContainerComponent],
})
export class CarouselContainerModule {}
