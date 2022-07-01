import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-carousel-container',
  templateUrl: './carousel-container.component.html',
  styleUrls: ['./carousel-container.component.scss'],
})
export class CarouselContainerComponent implements OnInit {
  @Input()
  data: any[] = [];

  @ContentChild('header') headerTemplateRef: TemplateRef<any> | undefined;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
