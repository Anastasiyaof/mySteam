import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {

  public userFriends!: number[]

  public users!: User[]
  
  public userInvites!: number[]

  public currentUser!: User

  public search = ''

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  accept(friendId: number) {
    this.userService.updateUserData(this.currentUser.id, {
      friends: [...this.userFriends, friendId],
      invites: this.userInvites.filter(invite => invite !== friendId)
    }).subscribe(() => {
      this.userInvites = this.userInvites.filter(invite => invite !== friendId)
      this.userFriends = [...this.userFriends, friendId]
    })
    this.userService.updateUserData(String(friendId), {
      friends: [...this.userFriends, +this.currentUser.id]
    }).subscribe()
  }

  invite(friendId: number) {
    const friendData = this.users.filter(user => +user.id === friendId)[0]
    this.userService.updateUserData(String(friendId), {
      invites: friendData.invites ? friendData.invites.concat(+this.currentUser.id) : [+this.currentUser.id]
    }).subscribe(() => {
      this.users =  this.users.filter(user => !user.invites?.includes(+this.currentUser.id))
    })
  }

  remove(friendId: number) {
    const friendData = this.users.filter(user => +user.id === friendId)[0]
    this.userService.updateUserData(this.currentUser.id, {
      friends: this.userFriends.filter(id => id !== friendId)
    }).subscribe(()=>{
      this.userFriends = this.userFriends.filter(id => id !== friendId)
    })
    this.userService.updateUserData(String(friendId), {
      friends: friendData.friends?.filter(id => id !== +this.currentUser.id)
    }).subscribe()

  }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.users = data.users)
    this.route.data.pipe(map(data => {
      this.currentUser = data.userData
      this.userFriends = data.userData.friends
      this.userInvites = data.userData.invites
    })).subscribe()
    console.log('i')
  }

}
