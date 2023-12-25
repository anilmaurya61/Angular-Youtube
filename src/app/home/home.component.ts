import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../Components/header/header.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/authentication.service'
import { UploadVideoComponent } from "../Components/upload-video/upload-video.component";
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from "../Components/subscription/subscription.component";
import { YourvideosComponent } from "../Components/yourvideos/yourvideos.component";
import { RouterModule } from '@angular/router';
import { fetchAllVideos, Video } from '../firebase/firestore'


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
    videos: any;
    searchQuery: string = 'heeriye';
    filteredVideos: Video[] = [];

    constructor(private authService: AuthService) { }

    ngOnInit() {
        fetchAllVideos()
            .then((videos: Video[]) => {
                this.videos = videos;
                this.filteredVideos = videos;
                console.log(this.videos);
            })
            .catch(error => {
                console.error('Error fetching videos: ', error);
            });
    }

    searchVideos(searchText:string) {
        console.log(searchText);

        const query = searchText.toLowerCase();

        this.filteredVideos = this.videos.filter((video: Video) =>
            video.title.toLowerCase().includes(query)
        );
    }

    handleswitch(tab: string) {
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
