import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-product',
  templateUrl: './carousel-product.component.html',
  styleUrls: ['./carousel-product.component.scss'],
})
export class CarouselProductComponent implements OnInit {
  @Input()
  categoria: string = '';
  @Input()
  titulo: string = '';

  constructor() {}

  ngOnInit() {}
}
