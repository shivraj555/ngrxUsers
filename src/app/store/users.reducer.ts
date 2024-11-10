import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { User } from '../models/user.model';

export interface State {
  users: User[];
  error: any;
}

// export const initialState: State = {
//   users: [],
//   error: null,
// };

export const initialState:User[] = [];

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess,(state,action)=>{
        return [...state, ...action.users]
  }),
  on(UserActions.updateUserSuccess,(state,action)=>{
    return state.map(u => (u.id === action.user.id ? action.user : u));
  }),
  on(UserActions.deleteUserSuccess,(state,action)=>{
    return state.filter(u => u.id !== action.userId);
  }),
  on(UserActions.addUserSuccess,(state,action)=>{
    return [...state,action.user];
  }),
  on(UserActions.loadUsersFailure, UserActions.addUserFailure, UserActions.updateUserFailure, UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
