import { Component } from '@angular/core';
import { HeaderComponent } from "../Component/header/header.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../authentication.service'

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ MatIconModule, HeaderComponent, MatSidenavModule]
})
export class HomeComponent {

    constructor(private authService: AuthService
        
        ) { }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }
}
