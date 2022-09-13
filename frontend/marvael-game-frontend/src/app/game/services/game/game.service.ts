import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../../models/game.model';
import { List } from '../../models/list.model';
import { Board } from '../../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private BASE_URL: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  createGame(body: any): Observable<object> {
    return this.http.post(`${this.BASE_URL}/juego/crear`, { ...body });
  }

  getGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(`${this.BASE_URL}/juegos/`);
  }

  startGame(body: any) {
    return this.http.post(`${this.BASE_URL}/juego/iniciar`, body);
  }

  getDeckByPlayer(playerId: string, gameId: string): Observable<List> {
    return this.http.get<List>(`${this.BASE_URL}/mazo/${playerId}/${gameId}`);
  }

  getBoard(gameId:string):Observable<Board>{
    return this.http.get<Board>(`${this.BASE_URL}/tablero/${gameId}`)
  }
}
