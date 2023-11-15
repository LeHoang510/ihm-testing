import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  onSubmit() {
    // TODO: Implement login logic here
    console.log(`Username: ${this.username}, Password: ${this.password}`);
  }
}
