import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/User.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.scss']
})
export class NewGameComponent implements OnInit {
listaUsuarios:Array<Usuario>=new Array <Usuario>();
  constructor(private user:UserService,private router:Router) { }

  ngOnInit(): void {
    this.user.listar().subscribe(user => {
      console.log(user);
      this.listaUsuarios=user
    });
  }
  crear(){
    this.router.navigate(['/gamelist']);
    }

}
