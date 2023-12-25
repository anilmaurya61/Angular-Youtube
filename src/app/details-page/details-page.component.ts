import { Component, ChangeDetectorRef  } from '@angular/core';
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
import { fetchVideosByUserId, Video } from '../firebase/firestore'
import { ActivatedRoute } from '@angular/router';

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
    comments: any[] = [];
    likesCount: number = 0;
    uploadVideoPopup = true;
    videos: any[] = [];
    userId: string = '';
    videoId: string = '';
    currentVideos: any[] = [];

    constructor(
        private authService: AuthService, 
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
        ) { }

    async ngOnInit() {
        this.user = await this.authService.getUser();
        this.photoURL = this.user?.photoURL;
        this.userName = this.user?.displayName
        this.route.params.subscribe(params => {
            this.userId = params['id'];
            this.videoId = params['videoId'];
            console.log('User ID:', this.userId);
        });
        fetchVideosByUserId(this.userId)
            .then((videos: Video[]) => {
                this.videos = videos.filter(v => v.id != this.videoId);
                let video = videos.find(v => v.id === this.videoId)
                this.currentVideos[0] = video;
                console.log(this.currentVideos, video);
            })
            .catch((error: any) => {
                console.error('Error fetching videos: ', error);
            });
    }
    handleCurrentVideo(id: string) {
        let video = this.videos.find(v => v.id === id)
        this.currentVideos[0] = video;   
        console.log(this.currentVideos);
    }
    handleUploadVideoPopup() {
        this.uploadVideoPopup = !this.uploadVideoPopup;
    }

    handlelikeUP() {
        this.likesCount++;
    }

    handlelikeDOWN() {
        this.likesCount--;
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

    handleComments() {
        if (this.commentText.trim().length > 0) {
            this.comments.push({
                "commentText": this.commentText,
                "photoURL": this.photoURL,
                "userName": this.userName
            })
        }
        this.commentText = "";
        this.commentBtn = false;
        console.log(this.comments);
    }
}
