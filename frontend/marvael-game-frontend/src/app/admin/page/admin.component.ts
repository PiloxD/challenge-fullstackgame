import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { Cards } from '../model/cards.model';
import { AdminService } from '../service/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
cards: Cards[] = [];
test: Boolean = false;
card: Cards = new Cards();
body: NgForm


  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getAllCards()
  }

  getAllCards(){
    this.adminService.getCards().subscribe({
      next: (resp) => {
        this.cards = resp;
      }
    })};

    delete(nombre: string){
      this.adminService.deleteCard(nombre).subscribe({
        next: (resp) => {

        }
      })
    }
    create(body: NgForm){
      this.adminService.createCards(this.card).subscribe({
        next: (resp) => {
          alert('SE HA CREADO CORRECTAMENTE')
        }
      })
    }
    update(body: any){
      this.adminService.createCards(body).subscribe({
        next: (resp) => {
          alert('SE HA CREADO ACTUALIZADO CORRECTAMENTE')
        }
      })
    }
    changeTest(){
      this.test = !this.test
    }
}
