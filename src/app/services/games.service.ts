import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Game[]> {
    return this.http.get(`${environment.firebase.dbUrl}/Games.json`)
      .pipe(
        map((objInd: {[key:string]: any}) => {
          return Object.keys(objInd).map(key => {
            return {
            ...objInd[key],
            id: key
          }
        })
        })
      )
  }
}

