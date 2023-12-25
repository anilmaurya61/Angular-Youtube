import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/authentication.service';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: any;
  photoUrl: string = "";
  name: string = "admin";
  searchText: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  @Output()
  addVideo = new EventEmitter<any>();

  @Output()
  searchVideos = new EventEmitter<any>();

  async ngOnInit() {
    try {
      this.user = await this.authService.getUser();
      this.photoUrl = this.user.photoURL;
    } catch (error) {
      console.log(error);
    }
  }

  public handleSearchtextChange(event:any){
    this.searchText = event.target.value;
  }
  public handleSearch(){
    this.searchVideos.emit(this.searchText)
    this.router.navigate(['/']);
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
