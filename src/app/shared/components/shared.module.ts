import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModule } from './../../pages/home/home.module';
import { CarouselContainerModule } from './carousel-container/carousel-container.module';
import { CarouselModule } from './carousel/carousel.module';

const coreModules = [CommonModule];

const baseModules = [CarouselModule, CarouselContainerModule];

const pageModules = [HomeModule];

@NgModule({
  imports: [...coreModules, ...baseModules, ...pageModules],
  exports: [...coreModules, ...baseModules, ...pageModules],
  declarations: [],
})
export class SharedModule {}
