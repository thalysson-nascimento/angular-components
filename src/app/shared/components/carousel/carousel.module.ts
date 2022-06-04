import { NgModule } from '@angular/core';
import { CarouselProductComponent } from '../carousel-product/carousel-product.component';
import { CarouselComponent } from './carousel.component';

@NgModule({
  declarations: [CarouselComponent, CarouselProductComponent],
  exports: [CarouselComponent, CarouselProductComponent],
  providers: [CarouselComponent],
})
export class CarouselModule {}
