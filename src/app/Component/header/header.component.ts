import { Component, EventEmitter, Output } from '@angular/core';
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
  user: any;
  photoUrl: string = "";
  name: string = "admin";

  constructor(private authService: AuthService) {}

  @Output()
  addVideo = new EventEmitter<any>();

  async ngOnInit() {
    try {
      this.user = await this.authService.getUser();
      this.photoUrl = this.user.photoURL;
      console.log(this.photoUrl);
      console.log("Hello",this.user);
    } catch (error) {
      console.log(error);
    }
  }

  public handleAddVideo(){
    this.addVideo.emit();
  }

  public async login() {
      await this.authService.login();
      console.log("Login");
      this.user = await this.authService.getUser();
      this.photoUrl = this.user.photoURL;
      console.log("Login",this.user.photoURL)
  }

  async logout() {
      await this.authService.logout();
      this.user = null;
      this.photoUrl = '';
  }
}
