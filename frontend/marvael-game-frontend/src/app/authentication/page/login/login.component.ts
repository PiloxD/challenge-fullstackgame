import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { User } from '../../../game/models/User.model';
import { AuthService } from '../../service/auth/auth.service';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {}

  loginGoogle() {
    this.loginService
      .loginGoogle()
      .then(({ user: { displayName, uid, email, photoURL } }) => {
        const user: User = {
          displayName: displayName || '',
          email: email || '',
          photoURL: photoURL || '',
          uid,
          onLine: true,
          disable: false,
        };
        this.userService.addUser(user).then(() => {
          this.router.navigate(['/home']);
        });
      });
  }
}
