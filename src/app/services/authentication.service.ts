import { Injectable } from '@angular/core';
import { app } from '../firebase/firbaseconfig'; 
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(app);
  public user:any;

  constructor() {}

  private async getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject("User not found");
        }
      });
    });
  }

  async getUser(): Promise<any> {
    try {
      this.user = await this.getCurrentUser();
      return this.user;
    } catch (error) {
      console.log(error);
    }
  }

  async login() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log("SignIn successfully",)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async logout() {
    await signOut(this.auth)
      .then(() => {
        console.log('logged out');
      })
      .catch((error) => {
        console.log("LogOut failed")
      });
  }
}
