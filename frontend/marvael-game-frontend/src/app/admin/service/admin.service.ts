import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cards } from '../model/cards.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private URL: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getGames(): Observable<Cards[]> {
    return this.http.get<Cards[]>(`${this.URL}/cards`);
  }


}
