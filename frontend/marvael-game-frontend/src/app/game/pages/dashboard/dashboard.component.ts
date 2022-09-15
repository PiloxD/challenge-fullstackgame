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
      .subscribe(() => {
        console.log("game id: ",this.gameId);
      });

    this.websocketService.conect(this.gameId).subscribe((res) => {
      console.log("WEBSOCKET: ",res);
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
          console.log("IF EN USO...")
        } else {
          console.log("ACTIVANDO ELSE...")
          this.router.navigate(['/gamelist']);
        }
      },
    });
  }

  initGame() {
    this.gameServices.startGame({ juegoId: this.gameId }).subscribe({
      next: (res) => {
        console.log("Init game: ",res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
