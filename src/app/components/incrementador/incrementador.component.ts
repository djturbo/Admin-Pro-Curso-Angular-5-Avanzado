import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  TAG = 'IncrementadorComponent :: ';
  @Input('pct')pct: number;
  @Input('leyend')leyend: string;
  @Output() setPCT: EventEmitter<number> = new EventEmitter();
  @ViewChild('percentInput') percentInput: ElementRef;

  constructor() { }

  changePct(increment: number) {
    if (increment < 0 && (this.pct - increment) < 0) {
      return false;
    }
    if (increment > 0 && (this.pct + increment) > 100) {
      return false;
    }

    this.pct += increment;
    this.setPCT.emit(this.pct);
    this.percentInput.nativeElement.focus();
  }
  onInputPctChange(newValue: number) {
    if ( newValue >= 0 && newValue <= 100){
      this.setPCT.emit(newValue);
    }
  }

  ngOnInit() {
  }

}
