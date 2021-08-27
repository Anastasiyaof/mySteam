import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {

  transform(value: Game[], ids: number[] | undefined): Game[] | void {
    if(ids) {
      return value.filter((val: Game) => {
        return ids.includes(+val.id)
       }) 
    }
  }

}
