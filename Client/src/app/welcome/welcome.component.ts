import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user:User|null=null;
  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.currentUser.subscribe(u=>{
      this.user=u;
      console.log(this.user?.userType);
      
    })
  }
}
