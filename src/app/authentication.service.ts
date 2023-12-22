import { Injectable } from '@angular/core';
import { app } from '../../src/app/firebase/firbaseconfig'; 
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(app);
  public user:any;

  constructor() {}

  getUser(){
    return this.user;
  }

  login() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log("SignIn successfully")
        this.user = result.user
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('logged out');
      })
      .catch((error) => {
        console.log("LogOut failed")
      });
  }
}
