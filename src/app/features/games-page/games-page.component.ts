 import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



export interface Game {
  id?: string,
  name: string,
  bought: boolean
}
@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {

  games$ = this.store.collection('games').valueChanges({idField: "id"}) as Observable<Game[]>
  constructor(private store: AngularFirestore ) { }

  ngOnInit(): void {
    console.log(this.games$.subscribe(console.log))
  }

}
