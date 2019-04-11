import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  constructor(
    public _db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged((theUser) => {
        console.log(theUser, 'USER');
        if (theUser) {
          resolve(theUser);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name
      }).then(res => {
        console.log(this.getCurrentUser());
        resolve(res);
      }, err => reject(err));
    });
  }
}
