import { Component } from '@angular/core';
import { fetchVideosByUserId, Video } from '../../firebase/firestore'
import { AuthService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-yourvideos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './yourvideos.component.html',
  styleUrl: './yourvideos.component.css'
})
export class YourvideosComponent {

  user:any;
  videos:any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadData();
  }

  private async loadData() {
    try {
      this.user = await this.authService.getUser();
      const videos = await fetchVideosByUserId(this.user?.uid);
      this.videos = videos;
    } catch (error) {
      console.error('Error fetching videos: ', error);
    }
  }
}
