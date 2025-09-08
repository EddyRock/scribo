import type { IFolder } from '@/services/firebase/firebase-service.ts';

interface IFoldersState {
  folders: IFolder[];
  creationLoading: boolean;
}

export type TFoldersAction =
  { type: 'SET_FOLDERS'; payload: IFolder[] }
  | { type: 'DELETE_FOLDERS'; payload: string[] }
  | { type: 'FOLDER_CREATE_LOADING', payload: boolean };
  ;

const initialState: IFoldersState = {
  folders: [],
  creationLoading: false,
};

export const foldersReducer = (state = initialState, action: TFoldersAction): IFoldersState => {
  switch (action.type) {
    case 'SET_FOLDERS':
      return { ...state, folders: [...state.folders, ...action.payload] };
    case 'DELETE_FOLDERS':
      return { ...state, folders: state.folders.filter(folder => folder.id && !action.payload.includes(folder.id)) };
    case 'FOLDER_CREATE_LOADING':
      return { ...state, creationLoading: action.payload };
    default:
      return state;
  }
};