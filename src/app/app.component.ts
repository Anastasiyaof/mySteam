import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  noLogged = false

  constructor( private readonly route: Router) {}

  ngOnInit(): void {
    if(this.noLogged) {
      this.route.navigate(['/login'])
    } else {
      this.route.navigate(['/main'])
    }
  }
  
}
