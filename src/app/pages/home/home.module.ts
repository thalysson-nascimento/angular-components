import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselContainerModule } from './../../shared/components/carousel-container/carousel-container.module';
import { CarouselWithIndicatorModule } from './../../shared/components/carousel-with-indicator/carousel-with-indicator.module';
import { CarouselWithTouchModule } from './../../shared/components/carousel-with-touch/carousel-with-touch.module';
import { CarouselModule } from './../../shared/components/carousel/carousel.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    CarouselContainerModule,
    CarouselWithIndicatorModule,
    CarouselWithTouchModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
