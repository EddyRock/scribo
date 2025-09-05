import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';

import type { Unsubscribe } from 'firebase/auth';

import { auth, db } from './firebase-config';

import type {
  User,
  UserCredential
} from 'firebase/auth'

export class FirebaseService {
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
  }

  onSetupAuthListener(callback: (user: User | null) => void ): Unsubscribe {
    return onAuthStateChanged(auth, callback);
  }

  async signUp(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      await this.createUserDocument(userCredential.user);

      return userCredential.user;
    } catch (error: any) {
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw error;
    }
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);

      await this.createUserDocument(result.user);

      return result.user;
    } catch (error: any) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  async createUserDocument(user: User): Promise<void> {
    const userDoc = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      await setDoc(userDoc, {
        email: user.email,
        displayName: user.displayName || '',
        createdAt: serverTimestamp(),
      });
    }
  }
}