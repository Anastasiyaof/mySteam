import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { ProfilePageComponent } from './features/profile-page/profile-page.component';
import { FriendsPageComponent } from './features/friends-page/friends-page.component';
import { GamesPageComponent } from './features/games-page/games-page.component';
import { MainLayoutComponent } from './shered/main-layout/main-layout.component';
import { LibraryPageComponent } from './features/library-page/library-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProfilePageComponent,
    FriendsPageComponent,
    GamesPageComponent,
    MainLayoutComponent,
    LibraryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
