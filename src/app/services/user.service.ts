import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, public auth: AuthService) { }

  getAll(): Observable<User[]> {
    return this.http.get(`${environment.firebase.dbUrl}/Users.json`)
      .pipe(
        map((objInd: { [key: string]: any }) => {
          return Object.keys(objInd).map(key => {
            return {
              ...objInd[key],
              id: key
            }
          })
        })
      )
  }

  getUserData() {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebase.apiKey}`, { idToken: this.auth.token})
      .pipe(
        map((res:{[key:string]: any}) => res.users[0].email),
        switchMap( email => {
          return this.getAll().pipe (
            map(users => {
              return [...users].filter(user => user.email === email)[0]
            })
           )
         })
      )
  }
}
