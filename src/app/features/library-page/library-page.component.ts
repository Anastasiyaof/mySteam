import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss']
})
export class LibraryPageComponent implements OnInit {

  public games$!: Observable<Game[]>

  constructor(
    private gameService: GamesService,
    private userService: UserService,
    private router: Router,
    private ref: ChangeDetectorRef
    ) { }

  public toGamesPage() {
    this.router.navigate(['/main','games'])
  }

  ngOnInit(): void {
    this.games$ = this.gameService.getAll().pipe(
      switchMap(games => {
        return this.userService.getUserData().pipe(
          map(user => {
            return [...games].filter(game => user.games?.includes(String(game.id)))
          })
        )
      })
    )
  }

}
