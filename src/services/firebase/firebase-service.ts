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
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';


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

// TODO: Fix all any's
export interface IFolder {
  id?: string;
  name: string;
  userId: string;
  createdAt: any;
}

export interface INote {
  id?: string;
  title: string;
  content: string;
  folderId: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
}
export class FirebaseService {
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
  }

  // Authentication methods
  onSetupAuthListener(callback: (user: User | null) => void ): Unsubscribe {
    return onAuthStateChanged(auth, callback);
  }

  getCurrentUserId(): string | null {
    return auth.currentUser ? auth.currentUser.uid : null;
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

  // Folder operations
  async getFoldersList(): Promise<IFolder[]> {
    try {
      const foldersQuery = query(
        collection(db, 'folders'),
        where('userId', '==', auth.currentUser?.uid)
      );

      const querySnapshot = await getDocs(foldersQuery);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as IFolder));
    } catch (error) {
      throw error;
    }
  }

  async createFolder(name: string): Promise<string> {
    try {
      const folderCollection = collection(db, 'folders');
      const newFolder: IFolder = {
        name,
        userId: auth.currentUser?.uid || '',
        createdAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(folderCollection, newFolder);
      return docRef.id;
    } catch (error) {
      throw error;
    }
  }

  async updateFolder(folderId: string, name: string): Promise<void> {
    try {
      const folderRef = doc(db, 'folders', folderId);
      await updateDoc(folderRef, { name });
    } catch (error) {
      throw error;
    }
  }

  async deleteFolder(folderId: string): Promise<void> {
    try {
      // First, delete all notes in the folder
      const notesQuery = query(
        collection(db, 'notes'),
        where('folderId', '==', folderId)
      );
      const notesSnapshot = await getDocs(notesQuery);
      
      const deletePromises = notesSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Then delete the folder
      const folderRef = doc(db, 'folders', folderId);
      await deleteDoc(folderRef);
    } catch (error) {
      throw error;
    }
  }

  // Note operations
  async createNote(userId: string, folderId: string, title: string, content: string): Promise<string> {
    try {
      const noteCollection = collection(db, 'notes');
      const newNote: INote = {
        title,
        content,
        folderId,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(noteCollection, newNote);
      return docRef.id;
    } catch (error) {
      throw error;
    }
  }

  async updateNote(noteId: string, updates: Partial<Pick<INote, 'title' | 'content'>>): Promise<void> {
    try {
      const noteRef = doc(db, 'notes', noteId);
      await updateDoc(noteRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(noteId: string): Promise<void> {
    try {
      const noteRef = doc(db, 'notes', noteId);
      await deleteDoc(noteRef);
    } catch (error) {
      throw error;
    }
  }

  async getFolderNotes(folderId: string): Promise<INote[]> {
    try {
      const notesQuery = query(
        collection(db, 'notes'),
        where('folderId', '==', folderId)
      );
      
      const querySnapshot = await getDocs(notesQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Note));
    } catch (error) {
      throw error;
    }
  }

  async getUserFolders(userId: string): Promise<IFolder[]> {
    try {
      const foldersQuery = query(
        collection(db, 'folders'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(foldersQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as IFolder));
    } catch (error) {
      throw error;
    }
  }
}
