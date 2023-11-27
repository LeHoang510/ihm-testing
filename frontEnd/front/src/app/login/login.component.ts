import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  constructor(public authService : AuthService, private router : Router){}

  onSubmit() {
    // TODO: Implement login logic here
    console.log(`Username: ${this.username}, Password: ${this.password}`);
    this.authService.isLoggedIn = true;
    this.router.navigateByUrl("");
    console.log("from login :"+this.authService.isLoggedIn);
  }


}
