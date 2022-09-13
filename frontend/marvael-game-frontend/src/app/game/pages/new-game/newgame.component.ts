import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { v4 as uuidv4, v4 } from 'uuid';
import { User as CurrentUser } from '@angular/fire/auth';
import { GameService } from '../../services/game/game.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { UserService } from '../../../authentication/service/user/user.service';
import { WebsocketService } from '../../services/websocket/websocket.service';
@Component({
  selector: 'app-new-game',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.scss'],
})
export class NewGameComponent implements OnInit {
  formUsers: FormGroup;
  private minPlayers: number = 2;
  private maxPlayer: number = 5;
  users: User[] = [];
  private comandCreateGame: any;
  private gameId: string;
  private mainPlayer: CurrentUser;

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private router: Router,
    private webSocketService: WebsocketService
    ) {
      this.mainPlayer = this.userService.getCurrentUser()!;
    this.gameId = v4();
    this.formUsers = this.createFormUsers();
    this.comandCreateGame = {
      juegoId: this.gameId,
      jugadores: { [this.mainPlayer.uid]: this.mainPlayer.displayName },
      jugadorPrincipalId: this.mainPlayer.uid,
    };
  }



  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.sort((a, b) => Number(b.onLine) - Number(a.onLine));
      },
    });
    this.webSocketService.conect(this.gameId).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {
        console.log('create');
        this.router.navigate(['/gamelist']);
      },
    });
  }

  createFormUsers(): FormGroup {
    return new FormGroup({
      user: new FormControl('', [
        Validators.required,
        this.validateMinPlayer.bind(this),
      ]),
    });
  }

  validateMinPlayer(control: AbstractControl): ValidationErrors | null {
    const quatityPlayer = control.value.length;
    if (
      quatityPlayer < this.minPlayers - 1 ||
      quatityPlayer > this.maxPlayer - 1
    )
      return {
        minPlayer: `Debes seleccionar de ${this.minPlayers} a ${this.maxPlayer} jugadores.`,
      };

    return null;
  }

  getClaseOnline(user: User) {
    return user.onLine ? 'online mr-2' : 'offline mr-2';
  }

  createGame() {

    const users = this.formUsers.value.user as User[];

    const playersCommand = this.generatePlayersCommand(users);

    this.comandCreateGame = {
      ...this.comandCreateGame,
      jugadores: { ...this.comandCreateGame.jugadores, ...playersCommand },
    };
    this.gameService.createGame(this.comandCreateGame).subscribe({
      next: (res) => console.log(res),
      complete: () => {
        this.disableUser(users);
        this.router.navigate(['/gamelist']);
      },
    });
  }

  private generatePlayersCommand(users: User[]) {
    return users.reduce((previous: any, current: User) => {
      return (previous = {
        ...previous,
        [current.uid]: current.displayName,
      });
    }, {});
  }

  private disableUser(users: User[]) {
    users.forEach(async (elem) => {
      this.userService
        .addUser({ ...elem, disable: true })
        .catch((err) => console.log(err));
    });
  }
}
