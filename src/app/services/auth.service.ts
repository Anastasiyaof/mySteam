import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  get token(): string | null {
    const expDate = localStorage.getItem('firebaseExpToken');
    if (new Date(expDate ? expDate : new Date()) < new Date()) {
      this.logout();
      return null;
    }
    return localStorage.getItem('firebaseToken');
  }

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  updateAuthEmail(newEmail: string) {
    const body = {
      idToken: this.token,
      email: newEmail,
      returnSecureToken: true,
    };
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebase.apiKey}`,
        body
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  private setToken(response: any): void {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('firebaseToken', response.idToken);
      localStorage.setItem('firebaseExpToken', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password or email');
        break;
    }

    return throwError(error);
  }
}
