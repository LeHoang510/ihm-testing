// node v18.16.0
// npm v6.14.18
// primeng v16.0.0



import { Component} from '@angular/core';
import {slideInAnimation} from "./animations/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent{
  title = 'front';
}
