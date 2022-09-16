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
  public gameTime: number = 0;
  list: List | null = null;
  board: Dashboard | null = null;
  isMainPlayer: boolean = false;
  cartasTablero: Array<string> = new Array();

  constructor(
    private websocketService: WebsocketService,
    private activatedRoute: ActivatedRoute,
    private gameServices: GameService,
    private userService: UserService,
    private router: Router
  ) {
    this.userId = this.userService.getCurrentUser()?.uid!;
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .pipe(
  //       switchMap(({ id }) => {
  //         this.gameId = id;
  //         return this.websocketService.conect(id);
  //       })
  //     )
  //     .subscribe(() => {});

  //   this.websocketService.conect(this.gameId).subscribe((res) => {});
  //   this.getDeckPlayer();
  //   this.getBoardId();
  // }

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
    this.gameServices.getSocketInfo(this.gameId).subscribe({
      next: (message) => {
        switch (message.type) {
          case 'cardgame.rondacreada':
            this.getDeckPlayer();
            this.cartasTablero = new Array();
            break;
          case 'cardgame.tiempocambiadodeltablero':
            console.log("PRUEBA: ", this.list.cartas[0].cartaId);
            if ((message.tiempo == 4) && (this.cartasTablero.length == 0) ) {
              this.putCardAFK();
            }
            this.gameTime = message.tiempo;
            break;
          case 'cardgame.ponercartaentablero':
            this.agregarCartaTablero();
            break;
          case 'cardgame.juegofinalizado':
            alert('GANADOOOOR HPTA');
            break;
          default:
            break;
        }
      },
      error: () => console.log('error'),
      complete: () => console.log('object'),
    });
    this.getDeckPlayer();
    this.getBoardId();
  }

  getDeckPlayer() {
    this.gameServices.getListByPlayer(this.userId, this.gameId).subscribe({
      next: (res) => {
        this.list = res;
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
  putCardAFK() {
    let cardRng = this.list.cartas[0]
    this.gameServices.putCard(this.userId, cardRng.cartaId, this.gameId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => console.log(error),
      complete: () => console.log('ESTÁS AFK, CARTA AÑADIDA'),
    });
  }
  agregarCartaTablero() {
    this.cartasTablero.push('1');
  }
  ponerCarta(cardId: string) {
    this.gameServices.putCard(this.userId, cardId, this.gameId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => console.log(error),
      complete: () => console.log('juegocreado'),
    });
  }
}
