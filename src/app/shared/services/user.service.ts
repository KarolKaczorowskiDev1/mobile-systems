import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { FirestoreService } from 'src/app/shared/model/firestore-service';
import { User } from 'src/app/shared/model/user';
import { WebcamImage } from 'ngx-webcam';

@Injectable({
  providedIn: 'root',
})
export class UserService extends FirestoreService<User> {
  protected override basePath: string = 'user';

  constructor(
    firestore: AngularFirestore
  ) {
    super(firestore);
  }

  docByUid(uid: string): Observable<User | null> {
    return this.getCollection((ref) => ref.where('uid', '==', uid)).pipe(
      map((collection) => (collection.length ? collection[0] : null))
    );
  }

  uploadProfilePicture(file: WebcamImage, user: User): void {
    const updatedUser: User = {
      ...user,
      base64Photo: file.imageAsBase64,
    }

    this.update(updatedUser, user.id!).subscribe();
  }
}
