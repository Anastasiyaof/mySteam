import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {

  public games$!: Observable<any>

  constructor(private gameService: GamesService) {}

  ngOnInit() {
    this.games$ = this.gameService.getAll()
    console.log(this.games$.subscribe(console.log))
  }


}
