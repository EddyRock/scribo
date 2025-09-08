import { FirebaseService } from "@services/firebase/firebase-service";

import { useDispatch } from "react-redux";

function useFirebase() {
  const firebase = new FirebaseService();
  const dispatch = useDispatch();

  const onSetupAuthListener =  () => {
      return firebase.onSetupAuthListener((user) => {
      if (user) {
        dispatch({ type: "AUTH_SUCCESS", payload: {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName
        } });
      } else {
        dispatch({ type: "AUTH_LOGOUT" });
      }
    });
  }
  const signIn = async (email: string, password: string) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      await firebase.signIn(email, password);
    } catch (error) {
      throw error;
    }
  };
  const signInWithGoogle = async () => {
    try {
      await firebase.signInWithGoogle();
    } catch (error) {
      throw error;
    }
  };
  const signUp = async (email: string, password: string, displayName?: string) => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      await firebase.signUp(email, password, displayName);
    } catch (error) {
      throw error;
    }
  };
  const signOut = async () => {
    dispatch({ type: "AUTH_LOADING" });
    try {
        await firebase.signOut();
    } catch (error) {
      throw error;
    }
  }

  const onSetupFoldersAndNotes = async () => {
    const userId = firebase.getCurrentUserId();
    if (!userId) return;

    try {
      const folders = await firebase.getUserFolders(userId);
      dispatch({ type: "SET_FOLDERS", payload: folders });
    } catch (error) {
      throw error;
    }
  }
  const onCreateFolder = async (name: string) => {
    dispatch({ type: "FOLDER_CREATE_LOADING", payload: true });

    try {
      const id = await firebase.createFolder(name);
      dispatch({ type: "SET_FOLDERS", payload: [{ id, name }] });
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: "FOLDER_CREATE_LOADING", payload: false });
    }
  };

  return {
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    onSetupAuthListener,

    onCreateFolder,
    onSetupFoldersAndNotes
  };
}

export default useFirebase;