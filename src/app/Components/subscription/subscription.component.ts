import { Component } from '@angular/core';
import { getSubscription, fetchVideosByUserId } from '../../firebase/firestore'
import { AuthService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { formatDistanceToNow } from "date-fns";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})

export class SubscriptionComponent {

  videos:any;

  constructor(private authService: AuthService) { };

  async ngOnInit() {
    const user = await this.authService.getUser();
    const subscription = await getSubscription(user.uid);
    if (subscription && subscription['channelIds']) {
      const channelIds = subscription['channelIds'];

      const videoPromises = channelIds.map((channelId: any) => fetchVideosByUserId(channelId));
      this.videos = await Promise.all(videoPromises);

      this.videos = this.videos.flat();
    }
  }

  timeStamp(dateObj: any) {
    const formattedDate = formatDistanceToNow(dateObj, { addSuffix: true });
    return formattedDate;
  }
}
