import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import * as UserActions from './users.actions';
import { User } from '../models/user.model';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}

  // Load Users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users: User[]) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  // Add User
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap((action) =>
        this.usersService.addUser(action.user).pipe(
          map((user: User) => UserActions.addUserSuccess({ user })),
          catchError((error) => of(UserActions.addUserFailure({ error })))
        )
      )
    )
  );

  // Update User
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.usersService.updateUser(action.user).pipe(
          map((user: User) => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  // Delete User
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        this.usersService.deleteUser(action.userId).pipe(
          map(() => UserActions.deleteUserSuccess({ userId: action.userId })),
          catchError((error) => of(UserActions.deleteUserFailure({ error })))
        )
      )
    )
  );
}
