import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  squares: any[] = [];
  xIsNext: boolean = true;
  winner: string | null = null;
  tied: boolean = false;
  player1: string = '';
  player2: string = '';
  readyToStart: boolean = false;
  finishGame: boolean = false;
  winnerArray: number[] = [];
  gamesHistory: any[] = [];

  ngOnInit() {
    fetch('http://localhost:3000/getAllGames')
    .then(res => res.json())
    .then(data => { this.gamesHistory = data }
    );
}

  definePlayer1(event: any) {
    return this.player1 = event.target.value;
  }
  definePlayer2(event: any) {
    return this.player2 = event.target.value;
  }

  newGame() {
    this.readyToStart = true;
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.tied = false;
    this.finishGame = false;
  }

  get currentPlayer() {
    return this.xIsNext ? this.player1 : this.player2;
  }

  paint(index: number) {
    return (this.winnerArray.includes(index)) ? true : false;
  }

  moveHelper(currentPlayer: string) {
    return (currentPlayer === this.player1) ? 'X' : 'O';
  }

  makeMove(id: number) {
    if (!this.squares[id]) {
      this.squares.splice(id, 1, this.moveHelper(this.currentPlayer));
      this.xIsNext = !this.xIsNext;
    }
    this.calculateWinner();
  }

  async makeScore() {
    const obj = {
      player1: this.player1,
      player2: this.player2,
      winner: this.winner,
    }
    const methods = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
    const score = await fetch('http://localhost:3000/makeWinner', methods);
    const data = await score.json();
    this.gamesHistory = data;
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.finishGame = true;
        this.winnerArray = lines[i];
        const isXTheWinner = this.squares[a] === 'X';
        this.winner = isXTheWinner ? this.player1 : this.player2;
        this.makeScore();
        return (isXTheWinner) ? this.winner = this.player1 : this.winner = this.player2;
      }
    }
    if(this.squares.every((square) => square !== null)) {
        this.finishGame = true;
        this.winnerArray = [];
        this.makeScore();
        return this.tied = true;
    }
    return null;
  }
}
