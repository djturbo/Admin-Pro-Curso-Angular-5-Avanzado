import { Component, OnInit } from '@angular/core';
declare function initPlugins();
@Component({
  selector: 'app-pages-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
