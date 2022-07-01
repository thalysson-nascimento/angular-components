import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input()
  data: Product[] = [];

  @ContentChild('contentTemplateRef')
  templateRef: TemplateRef<any> | undefined;
  indexImparesCarousel: Product[] = [];

  constructor(protected elementRef: ElementRef) {}

  ngOnInit() {
    this.indexImparesCarousel = this.data.filter(({}, indexImpares) => {
      const totalElement = indexImpares + 1;
      return totalElement % 2 == 1;
    });
  }

  getIndexImpares(indexImpares: any) {
    const totalElement = indexImpares + 1;
    return totalElement % 2 == 0;
  }

  onScroll() {
    const scrollListProductCarousel = this.elementRef
      .nativeElement as HTMLElement;
    const scrollList = scrollListProductCarousel.querySelectorAll('.items');
  }
}
