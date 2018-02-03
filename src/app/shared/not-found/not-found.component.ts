import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
