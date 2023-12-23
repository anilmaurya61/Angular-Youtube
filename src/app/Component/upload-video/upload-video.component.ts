import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output()
  closeAddvideo = new EventEmitter<any>();

  thumbnailUrl: any;
  title: string = '';
  description: any = '';
  tags: any = '';
  isUploading: boolean = true;

  public handleTitle(event:any) {
    this.title = event.target.value;
  }
  public handledescription(event:any) {
    this.description = event.target.value;
  }
  public handletags(event:any) {
    this.tags = event.target.value;
  }
  public handleupload(event:any) {
    console.log(this.title, this.description, this.tags);
    this.title = '', this.description = '', this.tags = ''
  }
  public closePopUp(){
    this.closeAddvideo.emit();
  }
  
  public onVideoFileChange(event: any) {

  }
  public uploadVideo() {

  }
}
