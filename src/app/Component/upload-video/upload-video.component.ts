import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-upload-video',
  standalone: true,
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css'],
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule]
})
export class UploadVideoComponent {

  onVideoFileChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  uploadVideo() {
    throw new Error('Method not implemented.');
  }
  thumbnailUrl: any;
  title: string = '';
  description: any;
  tags: any;
  isUploading: any;

  public handleTitle(event:any) {
    this.title = event.target.value;
    console.log(this.title);
  }
  public handleupload(event:any) {
  
  }
  // Add your component logic here
}
