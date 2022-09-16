import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { GameService } from '../../services/game/game.service';
import { UserService } from '../../../authentication/service/user/user.service';
import { List } from '../../models/list.model';
import { Dashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private gameId!: string;
  private userId: string;
  list: List | null = null;
  board: Dashboard | null = null;
  isMainPlayer: boolean = false;

  constructor(
    private websocketService: WebsocketService,
    private activatedRoute: ActivatedRoute,
    private gameServices: GameService,
    private userService: UserService,
    private router: Router
  ) {
    this.userId = this.userService.getCurrentUser()?.uid!;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.gameId = id;
          return this.websocketService.conect(id);
        })
      )
      .subscribe(() => {});

    this.websocketService.conect(this.gameId).subscribe((res) => {});
    this.getDeckPlayer();
    this.getBoardId();
  }
  // ngOnInit(): void {
  //   this.gameServices.getSocketInfo(this.gameId).subscribe({
  //     next: (message: { type: any; }) => {
  //       switch (message.type) {
  //         case "cardgame.rondacreada":
  //           break;
  //         case "cardgame.tiempocambiadodeltablero":
  //           break;
  //         case "cardgame.ponercartaentablero":
  //           break;
  //         case "cardgame.juegofinalizado":
  //           this.router.navigate([`/winner/${this.gameId}`]);
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     error: () => console.log('error'),
  //     complete: () => console.log('object'),
  //   });
  //   this.getDeckPlayer();
  //   this.getBoardId();
  // }

  getDeckPlayer() {
    this.gameServices.getListByPlayer(this.userId, this.gameId).subscribe({
      next: (res) => {
        this.list = res;
        console.log('AAAA XD: ', this.list);
      },
    });
  }

  getBoardId() {
    this.gameServices.getBoard(this.gameId).subscribe({
      next: (res) => {
        if (res) {
          this.isMainPlayer = res.jugadorPrincipalId == this.userId;
          this.board = res;
        } else {
          this.router.navigate(['/gamelist']);
        }
      },
    });
  }

  initGame() {
    this.gameServices.getSocketInfo(this.gameId).subscribe({
      next: (message: { type: any }) => {
        if (message.type == 'cardgame.tiempocambiadodeltablero') {
          console.log(message.type);
        }
      },
    });
    this.gameServices.startRound({ juegoId: this.gameId }).subscribe({
      next: (res) => {
        console.log('Init game');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ponerCarta(cardId: string) {
    console.log('CARTA PONIDA', this.userId, cardId, this.gameId);
    this.gameServices.putCard(this.userId, cardId, this.gameId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => console.log(error),
      complete: () => console.log('juegocreado'),
    });
  }
}
