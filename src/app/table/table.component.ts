import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
<table>
  <tr>
    <td>Player 'X' &nbsp;</td>
    <td>Points &nbsp;</td>
    <td>&nbsp; &nbsp;</td>
    <td>Points &nbsp;</td>
    <td>Player 'O' &nbsp;</td>
    <td>Date (YYYY-MM-DD) &nbsp;</td>
  </tr>
  <tr *ngFor="let game of history">
    <td
    [ngStyle]="{'color': game.player_one_points === '0' && game.player_two_points === '0' ? 'gray' : null ||
    game.player_one_points === '1' ? 'green' : 'rgb(196 16 16)'
    }"
    >{{ game.player_one }}</td>
    <td
    [ngStyle]="{'color': game.player_one_points === '0' &&  game.player_two_points === '0' ? 'gray' : null ||
    game.player_one_points === '1' ? 'green' : 'rgb(196 16 16)'
    }" >{{ game.player_one_points }}</td>
    <td [ngStyle]="{'color': 'gray'}" >&nbsp; X &nbsp;</td>
    <td
    [ngStyle]="{'color': game.player_one_points === '0' &&  game.player_two_points === '0' ? 'gray' : null ||
    game.player_two_points === '1' ? 'green' : 'rgb(196 16 16)'
  }" >{{ game.player_two_points }}</td>
  <td
  [ngStyle]="{'color': game.player_one_points === '0' &&  game.player_two_points === '0' ? 'gray' : null ||
  game.player_two_points === '1' ? 'green' : 'rgb(196 16 16)'
}" >{{ game.player_two }}</td>
<td>{{ game.date.split('T')[0] }}</td>
  </tr>
</table>
  `,
  styles: ['table { width: 90%; height: 20%; font-size: 1.5em !important; } td { text-align: center; } tr { text-align: center; }']
})
export class TableComponent {

  constructor() {
    this.history = [];
  }

  @Input() history: any[];
}
