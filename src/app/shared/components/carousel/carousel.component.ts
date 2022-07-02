import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Product } from '../../interfaces/product.interface';

type Carousel = {
  width: number;
  widthItem: number;
  listItem: ElementRef[];
};

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input()
  data: Product[] = [];

  @ContentChild('contentTemplateRef')
  templateRef: TemplateRef<any> | undefined;

  @ViewChild('carousel')
  domReferenceCarousel!: ElementRef<HTMLElement>;

  @ViewChild('itemCarousel')
  domReferenceItemCarousel!: ElementRef<HTMLElement>;

  @ViewChildren('itemCarousel')
  domReferenceListItemCarousel!: QueryList<ElementRef>;

  carousel: Carousel = {
    width: 0,
    widthItem: 0,
    listItem: [],
  };

  indexImparesCarousel: Product[] = [];

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.indexImparesCarousel = this.data.filter(({}, indexImpares) => {
      const totalElement = indexImpares + 1;
      return totalElement % 2 == 1;
    });
  }

  ngAfterViewInit(): void {
    console.log(this.domReferenceItemCarousel.nativeElement.nextSibling);

    const widthOfItem = this.domReferenceItemCarousel.nativeElement.offsetWidth;
    const totalListOfElement = this.domReferenceListItemCarousel.toArray();

    this.carousel = {
      width: this.getWidthCarousel(widthOfItem, totalListOfElement),
      widthItem: widthOfItem,
      listItem: totalListOfElement,
    };

    console.log(this.carousel);
  }

  private getWidthCarousel(
    constWidthOfItem: number,
    totalListElement: ElementRef<any>[]
  ): number {
    const result = constWidthOfItem * totalListElement.length;
    return result;
  }

  private getIndexImpares(indexImpares: any) {
    const totalElement = indexImpares + 1;
    return totalElement % 2 == 0;
  }

  scrollHorizontal(): number {
    return Number(this.domReferenceCarousel.nativeElement.scrollLeft.toFixed());
  }

  onScroll($event: any) {
    if (this.scrollHorizontal() > 200) {
      // this.carousel.listItem[2].nativeElement.scrollIntoView();
      this.domReferenceItemCarousel.nativeElement.nextSibling;
    }

    console.log(this.domReferenceItemCarousel.nativeElement.nextSibling);

    // console.log(this.scrollHorizontal());
    // console.log({
    //   nextElement: this.domReferenceItemCarousel.nativeElement.nextSibling,
    //   previousElement:
    //     this.domReferenceItemCarousel.nativeElement.previousSibling,
    // });

    // const nextElement =
    //   this.domReferenceItemCarousel.nativeElement.scrollIntoView();
    // console.log('--', nextElement);

    // this.domReferenceItemCarousel.nativeElement.scrollIntoView();
  }
}
