import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor( private readonly route: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // if(this.auth.isAuthenticated()) {
    //   this.route.navigate(['/main'])
    // } else {
    //   this.route.navigate(['/login'],{ queryParams: { order: 'popular' } })
    // }
  }
  
}
