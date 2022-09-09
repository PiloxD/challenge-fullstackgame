import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.scss']
})
export class GameListComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  tablero(){
    this.router.navigate(['/dashboard']);
    }

}
