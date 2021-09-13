import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, reduce, scan } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Game[]> {
    return this.http.get(`${environment.firebase.dbUrl}/Games.json`).pipe(
      map((objInd: { [key: string]: any }) => {
        return Object.keys(objInd).map((key) => {
          return {
            ...objInd[key],
            id: key,
          };
        });
      })
    );
  }

  public getMaxPrice(): Observable<number> {
    return this.getAll().pipe(
      map((games) => {
        return games.reduce((maxPrice: number, game: Game) => {
          if (+game.price > maxPrice) {
            maxPrice = +game.price;
          }
          return maxPrice;
        }, 0);
      })
    );
  }

  public getMinPrice(): Observable<number> {
    return this.getAll().pipe(
      map((games) => {
        return games.reduce((minPrice: number, game: Game) => {
          if (minPrice === 0) {
            minPrice = +game.price;
          }
          if (+game.price < minPrice) {
            minPrice = +game.price;
          }
          return minPrice;
        }, 0);
      })
    );
  }
}
