import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.users = data.users)
    this.route.data.pipe(map(data => {
      this.currentUser = data.userData
      this.userFriends = data.userData.friends
      this.userInvites = data.userData.invites
    })).subscribe()
  }

}
