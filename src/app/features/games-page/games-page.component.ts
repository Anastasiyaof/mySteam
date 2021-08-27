import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GamesService } from 'src/app/services/games.service';
import { GAMES_TAGS } from '../constants/constants';



@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {

  public games$!: Observable<Game[]>

  public search = ''

  public value!: number

  public maxPrice!: number

  public tags = GAMES_TAGS

  public tagsForm: string[] = []

  constructor(private gameService: GamesService) {}

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

  ngOnInit() {
    this.games$ = this.gameService.getAll()
    this.gameService.getMaxPrice().subscribe(value => {
      this.value = value
      this.maxPrice = value
    })
  }


}
