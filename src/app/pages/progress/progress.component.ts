import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  TAG = 'ProgressComponent :: ';
  pct1: number = 50;
  pct2: number = 25;

  constructor() { }
  updateProgress(event: number, id: number) {
    if (id === 1) {
      this.pct1 = event;
    } else {
      this.pct2 = event;
    }
  }
  ngOnInit() {
  }

}
