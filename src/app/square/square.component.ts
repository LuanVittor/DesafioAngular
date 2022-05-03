import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button nbButton outline status="primary" *ngIf="!value">{{ value }}</button>
    <button nbButton outline [ngStyle]="{'background-color': winnerButton ? 'green' : null }" status="warning" *ngIf="value === 'X'">{{ value }}</button>
    <button nbButton outline [ngStyle]="{'background-color': winnerButton ? 'green' : null }" status="info" *ngIf="value === 'O'">{{ value }}</button>

  `,
  styles: ['button { width: 100%; height: 100%; font-size: 5em !important; }'] 
})
export class SquareComponent {

  
  constructor() {
    this.value = 'X';
    this.disabled = false;
    this.winnerButton = false;

  }

  @Input() disabled: boolean;
  @Input() value: 'X' | 'O';
  @Input() winnerButton: boolean;


}
