import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


interface userProfile {
  username: string,
  email: string,
  age: string 
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {

  public profileForm!: FormGroup

  public currentUser!: userProfile

  private userId!: string

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  initForm() {
    this.profileForm = new FormGroup({
      username: new FormControl(`${this.currentUser.username}`, [Validators.required]),
      email: new FormControl(`${this.currentUser.email}`, [Validators.required,Validators.email]),
      age: new FormControl(`${this.currentUser.age}`)
    })
  }

  isChanged() {
    const changed = 
      this.profileForm.value.email !== this.currentUser.email ||
      this.profileForm.value.age !== this.currentUser.age ||
      this.profileForm.value.username !== this.currentUser.username
    return changed && this.profileForm.valid
  }

  submit() {
    console.log(this.profileForm)
    /* let updates = {...this.profileForm.value}
    if(this.profileForm.value.email !== this.currentUser.email) {
      this.authService.updeteAuthEmail(updates.email).subscribe(()=>
        this.authService.logout()
      )
    } else {
      let {email, ...rest} = updates
      updates = rest
    }
    this.userService.updateUserData(this.userId, updates).subscribe() */
  }

  ngOnInit(): void {
    this.route.data.pipe(map(data => {
      const { email, username, age, id} = data.userData 
      this.currentUser = {email, username, age}
      this.userId = id
    })).subscribe()
    this.initForm()
  }

}
