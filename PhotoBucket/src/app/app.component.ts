import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';

interface PhotoDetails {
  imageUrl: string;
  caption: string;
  $key?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  readonly photosPath = 'photos';

  // Comes only from Firebase
  title = '';

  formPhotoDetails: PhotoDetails = {
    'imageUrl': '',
    'caption': '',
  };

  ngOnInit(): void {
    firebase.database().ref().child('title').on('value', (snapshot: firebase.database.DataSnapshot) => {
      this.title = snapshot.val();
    });
  }

  ngOnDestroy(): void {
    firebase.database().ref().child('title').off();
  }

  // Read action into Firebase
  photoDetailsStream: FirebaseListObservable<PhotoDetails[]>;
  constructor(db: AngularFireDatabase) {
    this.photoDetailsStream = db.list(this.photosPath);
  }

  onSubmit(): void {
    try {
      if (this.formPhotoDetails.$key) {
        // Update action into Firebase
        this.photoDetailsStream.update(this.formPhotoDetails.$key, this.formPhotoDetails);
      } else {
        // Write action into Firebase
        this.photoDetailsStream.push(this.formPhotoDetails);
      }
      this.formPhotoDetails = {
        'imageUrl': '',
        'caption': '',
      };
    } catch (e) {
      console.log('Form error: ', e);
    }
  }

  edit(photoDetails: PhotoDetails): void {
    this.formPhotoDetails = photoDetails;
  }

  remove(photoDetailsKey: string): void {
    // Delete action of Firebase
    this.photoDetailsStream.remove(photoDetailsKey);
  }

}
