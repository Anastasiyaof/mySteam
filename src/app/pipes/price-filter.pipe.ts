import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(games: Game[], maxPrice: number): Game[] {
    return games.filter(game =>  +game.price <= maxPrice)
  }

}
