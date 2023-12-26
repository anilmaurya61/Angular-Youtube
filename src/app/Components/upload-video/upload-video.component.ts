import { Component, EventEmitter, Output } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes, getMetadata } from 'firebase/storage';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { db } from '../../firebase/firbaseconfig'
import { AuthService } from '../../services/authentication.service';


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

  thumbnailFile: any;
  videoFile: any;
  title: string = '';
  description: any = '';
  tags: any = '';
  isUploading: boolean = false;
  error: boolean = false;
  user:any;

  constructor(private authService: AuthService) {}


  getId() {
    return new Date().getTime().toString();
  }

  public handleTitle(event: any) {
    this.error = false;
    this.title = event.target.value;
  }

  public handledescription(event: any) {
    this.error = false;
    this.description = event.target.value;
  }

  public handletags(event: any) {
    this.error = false;
    this.tags = event.target.value;
  }

  public closePopUp() {
    this.closeAddvideo.emit();
  }

  public onThumbnailFileChange(event: any) {
    this.error = false;
    this.thumbnailFile = event.target.files[0];
  }

  public onVideoFileChange(event: any) {
    this.error = false;
    this.videoFile = event.target.files[0];
  }

  public async uploadVideo() {
    if (!this.title || !this.description || !this.tags || !this.thumbnailFile || !this.videoFile) {
      this.error = true;
      return;
    }

    const fileInput = document.getElementById('videoFile') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (this.videoFile) {

      this.isUploading = true;
      const thumbnailPath = 'Images/' + this.getId();
      const videoPath = 'videos/' + this.getId();

      const storage = getStorage();
      const storageRefThumbnail = ref(storage, thumbnailPath);
      const storageRefVideo = ref(storage, videoPath);

      const metadataThumbnail = {
        contentType: 'image/jpeg',
      };
      const metadata = {
        contentType: this.videoFile.type,
      };

      try {
        this.user = await this.authService.getUser();
        console.log(this.user);
        await uploadBytes(storageRefThumbnail, this.thumbnailFile, metadataThumbnail);
        await uploadBytes(storageRefVideo, this.videoFile, metadata);

        const thumbnailDownloadURL = await getDownloadURL(storageRefThumbnail);
        const videoDownloadURL = await getDownloadURL(storageRefVideo);

        const videoRef = await addDoc(collection(db, "videos"), {
          user_id: this.user?.uid,
          id: this.getId(),
          title: this.title,
          description: this.description,
          thumbnail: thumbnailDownloadURL,
          video: videoDownloadURL,
          tag: this.tags,
          time: new Date(),
          photoURL: this.user.photoURL,
          channelName: this.user.displayName,
        });
        console.log("Uploaded Successfully")
        this.closeAddvideo.emit();
      } catch (error) {
        console.error('Error uploading video:', error);
        this.isUploading = false;
      }
    }
  }
}
