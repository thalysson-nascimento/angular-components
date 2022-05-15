import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeModule } from './../../pages/home/home.module';
import { CarouselModule } from './carousel/carousel.module';

const coreModules = [CommonModule];

const baseModules = [CarouselModule];

const pageModules = [HomeModule];

@NgModule({
  imports: [...coreModules, ...baseModules, ...pageModules],
  exports: [...coreModules, ...baseModules, ...pageModules],
})
export class SharedModule {}
