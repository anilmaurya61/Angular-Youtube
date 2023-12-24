import { Component } from '@angular/core';
import { HeaderComponent } from "../Components/header/header.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../authentication.service';


@Component({
    selector: 'app-details-page',
    standalone: true,
    templateUrl: './details-page.component.html',
    styleUrl: './details-page.component.css',
    imports: [FormsModule, CommonModule, MatIconModule, MatButtonModule, HeaderComponent, MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class DetailsPageComponent {
    commentBtn: boolean = false;
    commentText: string = '';
    user: any;
    photoURL: string = '';
    userName: string = '';
    comments: any[] = [];
    likesCount: number = 0;

    constructor(private authService: AuthService) { }

    async ngOnInit() {
        this.user = await this.authService.getUser();
        this.photoURL = this.user.photoURL;
        this.userName = this.user.displayName
    }

    handlelikeUP(){
        this.likesCount++;
    }
    
    handlelikeDOWN(){
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

    handleComments(){
        this.comments.push({
            "commentText": this.commentText,
            "photoURL": this.photoURL,
            "userName": this.userName
        })
        this.commentText = "";
        this.commentBtn = false;
        console.log(this.comments);
    }
}
