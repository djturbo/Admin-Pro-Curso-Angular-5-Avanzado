import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic',
  templateUrl: './custom-graphic.component.html',
  styles: []
})
export class CustomGraphicComponent implements OnInit {

  @Input('options')options: any;

  constructor() { }

  ngOnInit() {
  }

}
