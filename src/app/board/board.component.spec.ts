import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BoardComponent } from './board.component';
// import mockMakeScore from './mocks/mocks';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setup Players name ', () => {
    it('you can define the player1 name', () => {
      component.definePlayer1({ target: { value: 'Player 1' } });
      expect(component.player1).toBe('Player 1');
    });
    it('you can define the player2 name', () => {
      component.definePlayer2({ target: { value: 'Player 2' } });
      expect(component.player2).toBe('Player 2');
    });
  });

  describe('start a new game', () => {
    it('should NOT be able to start a new game withiut a player two name', () => {
      component.definePlayer1({ target: { value: 'Player 1' } });
      expect(fixture.debugElement.query(By.css('startGame'))).toBeFalsy();
      expect(component.readyToStart).toBeFalsy();
    });

    it('should be able to start a new game', () => {
      component.definePlayer1({ target: { value: 'Player 1' } });
      component.definePlayer2({ target: { value: 'Player 2' } });
      component.newGame();
      expect(component.readyToStart).toBeTruthy();
      expect(component.squares).toEqual(Array(9).fill(null));
      expect(component.winner).toBeNull();
      expect(component.xIsNext).toBeTruthy();
      expect(component.tied).toBeFalse();
      expect(component.finishGame).toBeFalse();
    });
  })
  describe('Is possible to make a move', () => {
    beforeEach(() => {
      component.definePlayer1({ target: { value: 'Player 1' } });
      component.definePlayer2({ target: { value: 'Player 2' } });
      component.newGame();
    });

    it('should be possible to make a move', () => {
      component.makeMove(0);
      expect(component.squares[0]).toBe('X');
      expect(component.xIsNext).toBeFalsy();
    });

    it('should be possible to make the second move', () => {
      component.makeMove(0);
      component.makeMove(1);
      expect(component.squares[1]).toBe('O');
      expect(component.xIsNext).toBeTruthy();
    })
  });

  describe('calculate the winner', () => { 
    beforeEach(() => {
      component.definePlayer1({ target: { value: 'Player 1' } });
      component.definePlayer2({ target: { value: 'Player 2' } });
      component.newGame();
    });

    it('Player one can win', () => {
      component.makeMove(0);
      component.makeMove(1);
      component.makeMove(2);
      component.makeMove(3);
      component.makeMove(4);
      component.makeMove(5);
      component.makeMove(6);
      expect(component.winner).toBe('Player 1');
      expect(component.finishGame).toBeTruthy();
    });   

    it('Player two can win', () => {
      component.makeMove(0);
      component.makeMove(1);
      component.makeMove(2);
      component.makeMove(4);
      component.makeMove(3);
      component.makeMove(7);
      expect(component.winner).toBe('Player 2');
      expect(component.finishGame).toBeTruthy();
    }); 

    it('Tied game', () => {
      component.makeMove(0);
      component.makeMove(2);
      component.makeMove(1);
      component.makeMove(3);
      component.makeMove(4);
      component.makeMove(7);
      component.makeMove(5);
      component.makeMove(8);
      component.makeMove(6);

      expect(component.winner).toBeNull();
      expect(component.finishGame).toBeTruthy();
      expect(component.tied).toBeTruthy();
      expect(component.winnerArray).toEqual([]);
    });
  });

  describe('Click on the square', () => {
    beforeEach(() => {
      component.definePlayer1({ target: { value: 'Player 1' } });
      component.definePlayer2({ target: { value: 'Player 2' } });
      component.newGame();
    });

    it('should be possible to click on the square', () => {
      component.makeMove(0);
      expect(component.squares[0]).toBe('X');
    });

    it('should not be possible to click on the square after the game finished', () => {
      component.makeMove(0);
      component.makeMove(1);
      component.makeMove(2);
      component.makeMove(4);
      component.makeMove(3);
      component.makeMove(7);

      expect(component.winner).toBe('Player 2');
      expect(component.finishGame).toBeTruthy();
      expect(fixture.debugElement.query(By.css('square'))).toBeFalsy();
    });
  });

  describe('reset the game', () => {
    beforeEach(() => {
      component.definePlayer1({ target: { value: 'Player 1' } });
      component.definePlayer2({ target: { value: 'Player 2' } });
      component.newGame();
    });

    it('should be possible to reset the game', () => {
      component.makeMove(0);
      component.makeMove(1);
      component.makeMove(2);

      component.newGame();
      expect(component.squares).toEqual(Array(9).fill(null));
    });
  });

//   describe('game history', () => {
//     beforeEach(() => {
//       component.definePlayer1({ target: { value: 'Player 1' } });
//       component.definePlayer2({ target: { value: 'Player 2' } });
//       component.newGame();
//       component.makeMove(0);
//       component.makeMove(1);
//       component.makeMove(2);
//       component.makeMove(4);
//       component.makeMove(3);
//       component.makeMove(7);
//     });

//     it('the game game history must have at least one game', () => {
//       console.log(component.gamesHistory.length);
//       expect(component.gamesHistory.length).toBeGreaterThan(0);
//     });
//   });
});
