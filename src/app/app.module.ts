import { NgModule, Provider } from '@angular/core';
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
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { LibraryPageComponent } from './features/library-page/library-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SearchPipe } from './pipes/search.pipe';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { TagFilterPipe } from './pipes/tag-filter.pipe';
import { FilterByIdPipe } from './pipes/filter-by-id.pipe';
import { UserSearchPipe } from './pipes/user-search.pipe';
import { AlertComponent } from './shared/alert/alert.component';

const INTERSEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProfilePageComponent,
    FriendsPageComponent,
    GamesPageComponent,
    MainLayoutComponent,
    LibraryPageComponent,
    SearchPipe,
    PriceFilterPipe,
    TagFilterPipe,
    FilterByIdPipe,
    UserSearchPipe,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [INTERSEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
