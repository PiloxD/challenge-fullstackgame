import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { GameModel } from '../../models/game.model';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.scss'],
})
export class GameListComponent implements OnInit {
  gamesStarted: GameModel[] = [];
  gamesNoStarted: GameModel[] = [];

  constructor(
    private gameService: GameService,
    private websocketService: WebsocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (resp) => {
        this.gamesNoStarted = resp.filter((e) => e.iniciado == false);
        this.gamesStarted = resp.filter((e) => e.iniciado == true);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startGame(gameId: string) {

    this.gameService.startGame({ juegoId: gameId }).subscribe({
      next: (res) => {
        this.websocketService.conect(gameId).subscribe({
        });
      },
      complete: () => {

        this.router.navigate([`/dashboard/${gameId}`]);
      },
    });
  }
}
