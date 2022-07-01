import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  fromEvent,
  startWith,
  Subscription,
  switchMap,
  take,
} from 'rxjs';

@Component({
  selector: 'app-carousel-with-indicator',
  templateUrl: './carousel-with-indicator.component.html',
  styleUrls: ['./carousel-with-indicator.component.scss'],
})
export class CarouselWithIndicatorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('carousel', { read: CdkVirtualScrollViewport, static: true })
  public _carousel!: CdkVirtualScrollViewport;
  private magnet$!: Subscription;
  public activeElementIndex = 0;
  public scrollEnded = true;
  private afterViewInit = false;
  elements: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.elements = [
      {
        id: '1',
        title: 'example',
      },
      {
        id: '1',
        title: 'example',
      },
      {
        id: '1',
        title: 'example',
      },
      {
        id: '1',
        title: 'example',
      },
    ];
  }

  ngAfterViewInit(): void {
    fromEvent(this._carousel.elementRef.nativeElement, 'touchstart').subscribe(
      () => (this.scrollEnded = false)
    );
    const scrolled$ = fromEvent(
      this._carousel.elementRef.nativeElement,
      'scroll'
    );
    this.magnet$ = fromEvent(
      this._carousel.elementRef.nativeElement,
      'touchend'
    )
      .pipe(
        switchMap(() =>
          scrolled$.pipe(
            startWith(null as unknown as Event),
            debounceTime(50),
            take(1)
          )
        )
      )
      .subscribe(() => {
        this.scrollEnded = true;
        this._carousel.scrollToIndex(this.activeElementIndex, 'smooth');
      });

    this.afterViewInit = true;
  }

  ngOnDestroy(): void {
    if (this.magnet$) {
      this.magnet$.unsubscribe();
    }
  }
}
