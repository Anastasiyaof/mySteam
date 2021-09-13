import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'userSearch',
})
export class UserSearchPipe implements PipeTransform {
  transform(users: User[], search: string): User[] {
    if (!search.trim()) {
      return users;
    }
    return users.filter((user) => {
      return user.username?.toLowerCase().includes(search.toLowerCase());
    });
  }
}
