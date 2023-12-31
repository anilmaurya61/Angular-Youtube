import { Component } from '@angular/core';
import { HeaderComponent } from "../Components/header/header.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authentication.service';
import { UploadVideoComponent } from "../Components/upload-video/upload-video.component";
import {addLike, removeSubscription, getSubscription, fetchVideosByUserId, addSubscription, addComment, getComments, Comment } from '../firebase/firestore'
import { ActivatedRoute } from '@angular/router';
import { formatDistanceToNow } from "date-fns";

@Component({
    selector: 'app-details-page',
    standalone: true,
    templateUrl: './details-page.component.html',
    styleUrl: './details-page.component.css',
    imports: [FormsModule, CommonModule, MatIconModule, MatButtonModule, HeaderComponent, MatFormFieldModule, MatInputModule, MatSelectModule, UploadVideoComponent]
})

export class DetailsPageComponent {
    commentBtn: boolean = false;
    commentText: string = '';
    user: any;
    photoURL: string = '';
    userName: string = '';
    comments: Comment[] = [];
    likesCount: number = 0;
    uploadVideoPopup = true;
    videos: any[] = [];
    userId: string = '';
    videoId: string = '';
    currentVideos: any[] = [];
    relatedVideos: any[] = [];
    subscribe: any;
    isSubscribed: boolean = false;
    likeUp: boolean = false;
    likeDown: boolean = false;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.user = await this.authService.getUser();
        this.photoURL = this.user?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2yJWVwI9ZFnJhI3FIB5wIK4Ys7B8J-u5hfQ';
        this.userName = this.user?.displayName;

        this.route.params.subscribe(params => {
            this.userId = params['id'];
            this.videoId = params['videoId'];
            console.log('User ID:', this.userId);
        });

        try {
            this.videos = await fetchVideosByUserId(this.userId);
            this.relatedVideos = this.videos.filter(v => v.id !== this.videoId);
            this.currentVideos[0] = this.videos.find(v => v.id === this.videoId);
            this.comments = this.currentVideos[0]?.comments || [];
            this.likesCount = this.currentVideos[0].likesCount || 0;
        } catch (error) {
            console.error('Error fetching videos: ', error);
        }

        this.subscribe = await getSubscription(this.user?.uid);
        this.isSubscribed = this.subscribe?.channelIds.includes(this.currentVideos[0].user_id) || false;

    }

    handleCurrentVideo(id: string) {
        this.relatedVideos = this.videos.filter(v => v.id !== id)
        let video = this.videos.find(v => v.id === id)
        this.currentVideos[0] = video;
        this.comments = this.currentVideos[0].comments || [];
        this.likesCount = this.currentVideos[0].likesCount || 0;
    }
    handleUploadVideoPopup() {
        this.uploadVideoPopup = !this.uploadVideoPopup;
    }

    async handlelike(action: string) {
        await addLike(this.currentVideos[0].id, action)
       if(action === 'like'){
        this.likeUp = !this.likeUp;
        this.likesCount++;
       }
       else{
        this.likeDown = !this.likeDown;
        this.likesCount--;
       }
    }
    handleCommentTextChange(event: any): void {
        this.commentBtn = true;
        this.commentText = event.target.value;
        console.log(this.commentText);
    }

    cancelComment() {
        this.commentBtn = false;
        this.commentText = "";
    }
    timeStamp(dateObj: any) {
        const formattedDate = formatDistanceToNow(dateObj, { addSuffix: true });
        return formattedDate;
    }

    async handleSubscribe(channelId: string, userId: string) {
        await addSubscription(channelId, userId);
        this.isSubscribed = true;
    }

    async handleUnsubscribe(channelId: string, userId: string) {
        await removeSubscription(channelId, userId);
        this.isSubscribed = false;
    }
    async handLogintoComment() {
        await this.authService.login();
        this.user = await this.authService.getUser();
    }
    async handleComments() {
        if (this.commentText.trim().length > 0) {
            await addComment({
                commentText: this.commentText,
                photoURL: this.photoURL,
                userName: this.userName,
            }, this.currentVideos[0].id);
        }
        this.commentText = "";
        this.commentBtn = false;

        const comments = await getComments(this.currentVideos[0].id);
        this.comments = comments;
    }
}
