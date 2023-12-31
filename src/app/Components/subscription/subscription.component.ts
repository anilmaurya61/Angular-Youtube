import { Component } from '@angular/core';
import { getSubscription, fetchVideosByUserId } from '../../firebase/firestore'
import { AuthService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { formatDistanceToNow } from "date-fns";
import { RouterModule } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-subscription',
  standalone: true,
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
  imports: [CommonModule, RouterModule, LoaderComponent]
})

export class SubscriptionComponent {

  videos: any;
  user: any;
  isLoading = false;

  constructor(private authService: AuthService) { };

  async ngOnInit() {
    this.isLoading = true;
    this.user = await this.authService.getUser();
    if (this.user) {
      const subscription = await getSubscription(this.user?.uid);
      if (subscription && subscription['channelIds']) {
        const channelIds = subscription['channelIds'];

        const videoPromises = channelIds.map((channelId: any) => fetchVideosByUserId(channelId));
        this.videos = await Promise.all(videoPromises);

        this.videos = this.videos.flat();
      }
    }
    this.isLoading = false;
  }

  timeStamp(dateObj: any) {
    const formattedDate = formatDistanceToNow(dateObj, { addSuffix: true });
    return formattedDate;
  }
}
