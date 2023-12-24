import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../Components/header/header.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../authentication.service'
import { UploadVideoComponent } from "../Components/upload-video/upload-video.component";
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from "../Components/subscription/subscription.component";
import { YourvideosComponent } from "../Components/yourvideos/yourvideos.component";
import { RouterModule } from '@angular/router'; 


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, CommonModule, MatIconModule, HeaderComponent, MatSidenavModule, UploadVideoComponent, SubscriptionComponent, YourvideosComponent]
})
export class HomeComponent {
    @Input()
    ngSwitch: any
    
    uploadVideoPopup: boolean = true;
    tab: string = '';

    constructor(private authService: AuthService) { }

    handleswitch(tab: string){
        this.tab = tab;
    }

    public handleUploadVideoPopup() {
        this.uploadVideoPopup = !this.uploadVideoPopup;
    }

    login(): void {
        this.authService.login();
    }

    logout(): void {
        this.authService.logout();
    }
}
