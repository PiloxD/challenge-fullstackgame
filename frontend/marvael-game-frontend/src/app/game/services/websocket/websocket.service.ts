import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private URL: string = 'ws://localhost:8081/retrieve';
  private socket!: WebSocketSubject<unknown>;
  constructor() {}

  conect(idGame: string): Observable<WebSocketSubject<unknown>> {
    this.socket = webSocket(`${this.URL}/${idGame}`);
    return this.socket as Observable<WebSocketSubject<unknown>>;
  }
  close() {
    this.socket.unsubscribe();
  }
}
