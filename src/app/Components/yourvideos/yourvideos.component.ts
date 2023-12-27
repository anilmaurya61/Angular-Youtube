import { Component } from '@angular/core';
import { fetchVideosByUserId, Video } from '../../firebase/firestore'
import { AuthService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component"; 


@Component({
    selector: 'app-yourvideos',
    standalone: true,
    templateUrl: './yourvideos.component.html',
    styleUrl: './yourvideos.component.css',
    imports: [RouterModule, CommonModule, LoaderComponent]
})
export class YourvideosComponent {

  user:any;
  videos:any;
  isLoading = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadData();
  }

  private async loadData() {
    try {
      this.isLoading = true;
      this.user = await this.authService.getUser();
      const videos = await fetchVideosByUserId(this.user?.uid);
      this.isLoading = false;
      this.videos = videos;
    } catch (error) {
      console.error('Error fetching videos: ', error);
    }
  }
}
