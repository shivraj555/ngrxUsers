// users.component.ts

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as UserActions from '../store/users.actions';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls:['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  userForm: FormGroup | any;
  isEditMode = false;

  constructor(
    private store: Store<{ users: User[] }>,
    private fb: FormBuilder
  ) {
    this.users$ = this.store.select("users");
    console.log(`this.users$: `,this.store)
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]], 
    });
    this.store.dispatch(UserActions.loadUsers());
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.isEditMode) {
        this.store.dispatch(UserActions.updateUser({ user }));
      } else {
        console.log(user)
        this.store.dispatch(UserActions.addUser({ user }));
      }
      this.clearForm();
    }
  }

  editUser(user: User): void {
    this.userForm.patchValue(user);
    this.isEditMode = true;
  }

  deleteUser(userId: number): void {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  clearForm(): void {
    this.userForm.reset();
    this.isEditMode = false;
  }
}
