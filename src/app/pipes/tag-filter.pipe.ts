import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';

@Pipe({
  name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform {

  transform(games: Game[], tags:string[]): Game[] | undefined {
    return games.filter((game) => {
      const match = tags.map((tag) => game.tegs.includes(tag))
      return match.every(elem => elem === true)
    }) 
  }

}
