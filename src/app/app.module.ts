import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { userReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({users: userReducer}),
    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
