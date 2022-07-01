import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-with-touch',
  templateUrl: './carousel-with-touch.component.html',
  styleUrls: ['./carousel-with-touch.component.scss'],
})
export class CarouselWithTouchComponent implements OnInit {
  isDragging = false;
  startPos = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  animationID = 0;
  currentIndex = 0;
  slides: Element[] | null = [];
  slider!: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // fonte: https://codepen.io/bushblade/pen/ZEpvzbK?editors=1010

    // this.slider = document.querySelector('.slider-container');
    this.slider = this.elementRef.nativeElement.querySelector(
      '.slider-container'
    ) as HTMLElement;

    this.slides = Array.from(document.querySelectorAll('.slide'));

    this.slides.forEach((slide, index) => {
      const slideImage = slide.querySelector('img');
      // disable default image drag
      slideImage?.addEventListener('dragstart', (e) => e.preventDefault());
      // touch events
      slide.addEventListener('touchstart', this.touchStart(index));
      slide.addEventListener('touchend', this.touchEnd);
      slide.addEventListener('touchmove', this.touchMove);
      // mouse events
      slide.addEventListener('mousedown', this.touchStart(index));
      slide.addEventListener('mouseup', this.touchEnd);
      slide.addEventListener('mousemove', this.touchMove);
      slide.addEventListener('mouseleave', this.touchEnd);
    });

    // make responsive to viewport changes
    window.addEventListener('resize', this.setPositionByIndex);

    // prevent menu popup on long press
    window.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }

  getPositionX(event: any) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  }

  touchStart(index: any) {
    return (event: any) => {
      this.currentIndex = index;
      this.startPos = this.getPositionX(event);
      this.isDragging = true;
      this.animationID = requestAnimationFrame(this.animation);
      this.slider.classList.add('grabbing');
    };
  }

  touchMove(event: any) {
    if (this.isDragging) {
      const currentPosition = this.getPositionX(event);
      this.currentTranslate =
        this.prevTranslate + currentPosition - this.startPos;
    }
  }

  touchEnd() {
    cancelAnimationFrame(this.animationID);
    this.isDragging = false;
    const movedBy = this.currentTranslate - this.prevTranslate;

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && this.currentIndex < this.slides!.length - 1)
      this.currentIndex += 1;

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && this.currentIndex > 0) this.currentIndex -= 1;

    this.setPositionByIndex();

    this.slider.classList.remove('grabbing');
  }

  animation() {
    this.setSliderPosition();
    if (this.isDragging) requestAnimationFrame(this.animation);
  }

  setPositionByIndex() {
    this.currentTranslate = this.currentIndex * -window.innerWidth;
    this.prevTranslate = this.currentTranslate;
    this.setSliderPosition();
  }

  setSliderPosition() {
    // this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
    this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  // options: any;
  // prevSlide: null;
  // currentSlide: any;
  // slidesCount: any;
  // slideWidth: any;
  // posX: number;
  // translateX: number;
  // swipeProgress: number;
  // touching: boolean;
  // swiping: boolean;
  // _startX: any;
  // _currentX: number;
  // _shiftX: number;
  // _testX: 0;
  // _testY: 0;
  // _runCallbacks: any;
  // private _currentY: any;
  // constructor(
  //   @Inject(DOCUMENT) private document: Document
  // ) {
  //   this.options = {
  //     slider: null,
  //     list: null,
  //     prevBtn: null,
  //     nextBtn: null,
  //     speed: 600,
  //     initialSlide: 0,
  //     keyboardControll: false,
  //     runCallbacks: true,
  //     onSlideChangeStart: null,
  //     onSlideChangeEnd: null,
  //     onSwipe: null,
  //     ...this.options,
  //   };
  //   this.prevSlide = null;
  //   this.currentSlide = this.options.initialSlide;
  //   this.slidesCount = this.options.list.children.length;
  //   this.slideWidth = this.options.slider.offsetWidth;
  //   this.posX = 0;
  //   this.translateX = 0;
  //   this.swipeProgress = 0;
  //   this.touching = false;
  //   this.swiping = false;
  //   this._startX = 0;
  //   this._currentX = 0;
  //   this._shiftX = 0;
  //   this._testX = 0;
  //   this._testY = 0;
  //   this._runCallbacks = this.options.runCallbacks;
  //   this.init();
  // }
  // init() {
  //   this._setInitialSlide();
  //   this._addEventListeners();
  // }
  // ngOnInit() {}
  // _setInitialSlide() {
  //   if (this.currentSlide === 0) return;
  //   this.translateX = -this.currentSlide * this.slideWidth;
  //   this.posX = this.translateX;
  //   this.options.list.style.transform = `translateX(${this.translateX}px)`;
  // }
  // _addEventListeners() {
  //   this.options.slider.on('touchstart', this._onPointerStart, {
  //     passive: true,
  //   });
  //   this.options.slider.on('mousedown', this._onPointerStart);
  //   this.options.slider.on('touchmove', this._onPointerMove);
  //   this.options.slider.on('mousemove', this._onPointerMove);
  //   this.options.slider.on('touchend, mouseup, mouseleave', this._onPointerEnd);
  //   this.options.keyboardControll && document.on('keydown', this._onKeyDown);
  //   this.options.prevBtn && this.options.prevBtn.on('click', this.slidePrev);
  //   this.options.nextBtn && this.options.nextBtn.on('click', this.slideNext);
  //   window.on('resize', this._onWindowResize);
  // }
  // slidePrev = () => {
  //   requestAnimationFrame(() => this.slideTo(this.currentSlide - 1));
  // };
  // slideNext = () => {
  //   requestAnimationFrame(() => this.slideTo(this.currentSlide + 1));
  // };
  // _onKeyDown = ({ keyCode }: any) => {
  //   switch (keyCode) {
  //     case 37:
  //       this.slidePrev();
  //       break;
  //     case 39:
  //       this.slideNext();
  //       break;
  //   }
  // };
  // _onWindowResize = () => {
  //   this.slideWidth = this.options.slider.offsetWidth;
  //   this.translateX = -this.currentSlide * this.slideWidth;
  //   this.options.list.style.transform = `translateX(${this.translateX}px)`;
  //   this.posX = this.translateX;
  // };
  // _setAnimatable(slow = false) {
  //   const transition = slow
  //     ? `transform ${this.options.speed}ms cubic-bezier(0.6, 0.6, 0.2, 1)`
  //     : `transform ${
  //         this.options.speed * 0.75
  //       }ms cubic-bezier(0.3, 0.4, 0.6, 1)`;
  //   this.options.list.style.transition = transition;
  //   this.options.list.once('transitionend', () => {
  //     this.options.list.style.transition = '';
  //     this._onSlideChangeEnd();
  //   });
  // }
  // _onSlideChangeEnd() {
  //   if (
  //     this.prevSlide !== this.currentSlide &&
  //     this._runCallbacks &&
  //     this.options.onSlideChangeStart
  //   ) {
  //     this.options.onSlideChangeEnd(this);
  //   }
  // }
  // _onSlideChangeStart() {
  //   if (
  //     this.prevSlide !== this.currentSlide &&
  //     this._runCallbacks &&
  //     this.options.onSlideChangeStart
  //   ) {
  //     this.options.onSlideChangeStart(this);
  //   }
  // }
  // slideTo(index: any, runCallbacks = this.options.runCallbacks, slow = true) {
  //   this.prevSlide = this.currentSlide;
  //   this._runCallbacks = runCallbacks;
  //   this.currentSlide = Math.max(0, index);
  //   this.currentSlide = Math.min(this.slidesCount - 1, this.currentSlide);
  //   this._onSlideChangeStart();
  //   this.translateX = -this.currentSlide * this.slideWidth;
  //   if (this.posX === this.translateX) return;
  //   this._setAnimatable(slow);
  //   this.options.list.style.transform = `translateX(${this.translateX}px)`;
  //   this.posX = this.translateX;
  // }
  // _onPointerEnd = () => {
  //   if (!this.touching) return;
  //   this.touching = false;
  //   this.posX = this.translateX;
  //   const progress = Math.abs(this._shiftX) / this.slideWidth;
  //   const minShift = progress >= 0.1;
  //   const direction = this._shiftX < 0 ? 1 : -1;
  //   let index = this.currentSlide;
  //   if (this.swiping && minShift) {
  //     index += direction;
  //   }
  //   requestAnimationFrame(() => this.slideTo(index));
  //   this.swiping = false;
  //   this.swipeProgress = 0;
  // };
  // _getX(e: any) {
  //   return e.touches ? e.touches[0].pageX : e.pageX;
  // }
  // _getY(e: any) {
  //   return e.touches ? e.touches[0].pageY : e.pageY;
  // }
  // _onPointerStart(e: any) {
  //   this.touching = true;
  //   this._startX = this._getX(e);
  //   this._currentX = this._startX;
  //   this._testX = this._getX(e);
  //   this._testY = this._getY(e);
  //   if (!e.touches) {
  //     this.swiping = true;
  //     requestAnimationFrame(this._update);
  //   }
  // }
  // _update = () => {
  //   if (!this.touching) return;
  //   requestAnimationFrame(this._update);
  //   this._shiftX = this._currentX - this._startX;
  //   this.translateX = this.posX + this._shiftX;
  //   this.options.list.style.transform = `translateX(${this.translateX}px)`;
  //   if (this.options.onSwipe) {
  //     this.swipeProgress = Math.abs(this._shiftX) / this.slideWidth;
  //     this.options.onSwipe && this.options.onSwipe(this);
  //   }
  // };
  // _onPointerMove(e: any) {
  //   if (!this.touching) return;
  //   this._currentX = this._getX(e);
  //   this._currentY = this._getY(e);
  //   if (e.touches && this._testX && this._testY) {
  //     const xDiff = this._testX - this._currentX;
  //     const yDiff = this._testY - this._currentY;
  //     // Is swiping horizontal
  //     if (Math.abs(xDiff) > Math.abs(yDiff)) {
  //       e.preventDefault();
  //       this.swiping = true;
  //       requestAnimationFrame(this._update);
  //     }
  //     this._testX = 0;
  //     this._testY = 0;
  //   }
  // }
}
