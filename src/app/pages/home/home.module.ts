import { NgModule } from '@angular/core';
import { CarouselModule } from './../../shared/components/carousel/carousel.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CarouselModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
