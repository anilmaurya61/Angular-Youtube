import { Component } from '@angular/core';
import { HeaderComponent } from "../Component/header/header.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../authentication.service'
import { UploadVideoComponent } from "../Component/upload-video/upload-video.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, MatIconModule, HeaderComponent, MatSidenavModule, UploadVideoComponent]
})
export class HomeComponent {

    uploadVideoPopup: boolean = true;

    constructor(private authService: AuthService) { }

    public handleUploadVideoPopup() {
        this.uploadVideoPopup = !this.uploadVideoPopup;
    }
    
    login(): void{
        this.authService.login();
    }

    logout(): void{
        this.authService.logout();
    }
}
