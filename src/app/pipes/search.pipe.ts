import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  
  transform(games: Game[], search:string = ''): Game[] {
    if(!search.trim()) {
      return games
    }
    return games.filter(game => {
     
      return game.name.toLowerCase().includes(search.toLowerCase())
    })
  }
  

}
