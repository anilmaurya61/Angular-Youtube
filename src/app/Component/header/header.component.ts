import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService) {
    this.User();
  }

  public User(){
   const user = this.authService.getUser()
   console.log(user)
  }

  public login() {
    console.log("Login");
      this.authService.login();
  }

  logout() {
      this.authService.logout();
  }
}
