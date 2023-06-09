import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  
  constructor(public authService: AuthService,) { }
 
  ngOnInit(): void {
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }
}
