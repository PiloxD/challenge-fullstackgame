import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../../models/game.model';
import { List } from '../../models/list.model';
import { Dashboard } from '../../models/dashboard.model';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private URL: string = 'http://localhost:8080';
  private socket: any;

  constructor(private http: HttpClient) {}

  createGame(body: any): Observable<object> {
    return this.http.post(`${this.URL}/juego/crear`, { ...body });
  }

  getGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(`${this.URL}/juego/listar`);
  }

  startGame(body: any) {
    console.log('BODY: ', body);
    return this.http.post(`${this.URL}/juego/iniciar`, body);
  }

  getListByPlayer(playerId: string, gameId: string): Observable<List> {
    console.log('playerId: ', playerId);
    console.log('gameId: ', gameId);
    return this.http.get<List>(`${this.URL}/juego/mazo/${playerId}/${gameId}`);
  }

  getBoard(gameId: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.URL}/juego/${gameId}`);
  }
  startRound(body: any) {
    return this.http.post('http://localhost:8080/juego/ronda/iniciar', body);
  }

  putCard(playerId: string, cardId: string, gameId: string) {
    return this.http.post('http://localhost:8080/juego/poner', {
      jugadorId: playerId,
      cartaId: cardId,
      juegoId: gameId,
    });
  }
  getSocketInfo(idGame: string): any {
    this.socket = webSocket(`ws://localhost:8081/retrieve/${idGame}`);
    return this.socket;
  }
  close() {
    this.socket.unsubscribe();
  }
}
