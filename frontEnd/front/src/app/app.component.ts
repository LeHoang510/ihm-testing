// node v18.16.0
// npm v6.14.18
// primeng v16.0.0


// yml equivalent pour installer toutes les librairies necessaires -> pas besoin car toutes les dependances sont mises dans le package.json

import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'front';
}