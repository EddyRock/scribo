export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export type TAuthAction =
  | { type: 'AUTH_LOADING' }
  | { type: 'AUTH_SUCCESS'; payload: IUser }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' };

const initialAuthState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const authReducer = (
  state = initialAuthState,
  action: TAuthAction
): IAuthState => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'AUTH_LOGOUT':
      return {
        ...initialAuthState
      };
    default:
      return state;
  }
};