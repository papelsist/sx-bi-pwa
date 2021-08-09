import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

import { throwError, of, Observable } from 'rxjs';
import {
  catchError,
  map,
  pluck,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';

import { User, UserInfo } from '../@models/user';
import { mapUser } from './utils';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user$ = this.auth.authState.pipe(
    map((user) => (user ? mapUser(user) : null)),
    shareReplay()
  );

  readonly claims$ = this.auth.idTokenResult.pipe(
    map((res) => (res ? res.claims : {}))
  );

  readonly userInfo$: Observable<UserInfo | null> = this.user$.pipe(
    switchMap((user) => {
      return user ? this.getUserByUid(user.uid) : of(null);
    }),

    catchError((err) => throwError(err))
  );

  readonly userDto$ = this.user$.pipe(
    map((u) => {
      const { uid, email, displayName } = u;
      return { uid, email, displayName };
    })
  );

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore
  ) {}

  async singOut() {
    await this.auth.signOut();
  }

  async signInAnonymously() {
    const { user } = await this.auth.signInAnonymously();
    return mapUser(user);
  }

  async signIn(email: string, password: string) {
    try {
      const { user } = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      throw new Error('Credenciales incorrectas');
    }
  }

  sendEmailVerification(user: User) {
    const url = `https://${location.host}/home`;
    console.log('Sending verification email return url: ', url);
    return user.firebaseUser.sendEmailVerification({
      url: url,
      handleCodeInApp: false,
    });
  }

  getUserByUid(uid: string): Observable<UserInfo> {
    return this.firestore
      .collection<UserInfo>('usuarios')
      .doc(uid)
      .valueChanges({ idField: 'uid' });
  }

  async updateSucursal(user: UserInfo, sucursal: string) {
    await this.firestore
      .collection('usuarios')
      .doc(user.uid)
      .update({ sucursal });
  }
}
