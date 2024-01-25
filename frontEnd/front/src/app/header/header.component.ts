import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  selectLang:string="";
  transLang : string[] =[];
  title : string = "modelingTitle";
  isLoggedIn! : boolean;

  constructor(public translate: TranslateService, private router: Router, public authService : AuthService ){
    translate.setDefaultLang('FR');
    translate.addLangs(['EN', 'FR']);
    translate.use('FR');
    this.selectLang = translate.currentLang;
  }

  setTransLanguage(){
    this.translate.use(this.selectLang);
  }

  getTransLanguage(){
    this.transLang=[...this.translate.getLangs()];
  }

  ngOnInit(){
    this.getTransLanguage();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      switch (currentRoute) {
        case '/home' : this.title = 'homeTitle'; break;
        case '/settings' : this.title = 'settingsTitle'; break;
        case '/login' : this.title = 'loginTitle'; break;
        case '/modeling' : this.title = 'modelingTitle'; break;
      }
    });
    this.isLoggedIn = this.authService.isLoggedIn;
    //console.log("from header :"+this.isLoggedIn);
  }
  change(){
    this.authService.isLogging = false;
  }
  logout(){
    this.authService.isLoggedIn = false;
    console.log("User logged out");
  }
  login(){
    this.authService.isLogging = true;
    console.log("User clicked on login page");
  }

  home(){
    console.log("User clicked on home page");
  }

  settings(){
    console.log("User clicked on settings page");
  }

  data(){
    console.log("User clicked on modeling page");
  }



}
