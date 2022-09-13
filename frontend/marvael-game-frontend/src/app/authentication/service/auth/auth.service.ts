import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private autFirebase: Auth, private route: Router) {}

  loginGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.autFirebase, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.autFirebase);
  }
}
