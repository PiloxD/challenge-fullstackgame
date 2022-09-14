import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameModel } from '../../models/game.model';
import { List } from '../../models/list.model';
import { Dashboard } from '../../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private URL: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  createGame(body: any): Observable<object> {
    return this.http.post(`${this.URL}/juego/crear`, { ...body });
  }

  getGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(`${this.URL}/juegos/`);
  }

  startGame(body: any) {
    return this.http.post(`${this.URL}/juego/iniciar`, body);
  }

  getListByPlayer(playerId: string, gameId: string): Observable<List> {
    return this.http.get<List>(`${this.URL}/mazo/${playerId}/${gameId}`);
  }

  getBoard(gameId:string):Observable<Dashboard>{
    return this.http.get<Dashboard>(`${this.URL}/tablero/${gameId}`)
  }
}
