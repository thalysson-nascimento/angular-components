import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselProductComponent } from '../carousel-product/carousel-product.component';
import { CarouselComponent } from './carousel.component';

@NgModule({
  declarations: [CarouselComponent, CarouselProductComponent],
  imports: [CommonModule],
  exports: [CarouselComponent, CarouselProductComponent],
  providers: [CarouselComponent],
})
export class CarouselModule {}
