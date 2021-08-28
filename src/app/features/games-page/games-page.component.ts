import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { User } from 'src/app/models/user.model';
import { GamesService } from 'src/app/services/games.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/shered/alert.service';
import { GAMES_TAGS } from '../constants/constants';



@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {

  public games$!: Observable<Game[]>

  public user$!: Observable<User>

  public search = ''

  public value!: number

  public maxPrice!: number
  
  public minPrice!: number

  public tags = GAMES_TAGS

  public tagsForm: string[] = []

  constructor(
    private gameService: GamesService,
    private userService: UserService,
    private alertService: AlertService
    ) {}

  public log() {
    console.log(this.value)
    
  }

  change(event: Event) {
    const target = (event.target as HTMLInputElement)
    if(target.checked) {
      this.tagsForm = [...this.tagsForm, target.value]
    } else if(this.tagsForm.includes(target.value)) {
      this.tagsForm = this.tagsForm.filter(item => item !== target.value)
    }
  }

  addToLibrary(event: Event, gameId: number,user: User) {
    let {games} = user
    games = games?.concat(+gameId)
    const userObj = {
      ...user,
      games
    }
    this.userService.updateUserData(user.id, userObj).subscribe(() =>
      (event.target as HTMLButtonElement).disabled = true
    )
    this.alertService.success('Added')
  }

  ngOnInit() {
    this.games$ = this.gameService.getAll()
    this.user$ = this.userService.getUserData()
    this.gameService.getMaxPrice().subscribe(value => {
      this.value = value
      this.maxPrice = value
    })
    this.gameService.getMinPrice().subscribe(value => {
      this.minPrice = value
    })
  }

}
