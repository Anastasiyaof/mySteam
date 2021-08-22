import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FriendsPageComponent } from './features/friends-page/friends-page.component';
import { GamesPageComponent } from './features/games-page/games-page.component';
import { LibraryPageComponent } from './features/library-page/library-page.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { ProfilePageComponent } from './features/profile-page/profile-page.component';
import { MainLayoutComponent } from './shered/main-layout/main-layout.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'main', component: MainLayoutComponent, children: [
    {path: '', redirectTo: 'games', pathMatch: 'full'},
    {path: 'profile', component: ProfilePageComponent},
    {path: 'friends', component: FriendsPageComponent},
    {path: 'games', component: GamesPageComponent},
    {path: 'library', component: LibraryPageComponent}
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
