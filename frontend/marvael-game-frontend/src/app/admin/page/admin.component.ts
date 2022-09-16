import { Component, OnInit } from '@angular/core';

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

  constructor(
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getAllCards()
  }

  getAllCards(){
    this.adminService.getGames().subscribe({
      next: (resp) => {
        this.cards = resp;
      }
    })};
}
