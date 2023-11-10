import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  selectLang:string="";
  transLang : string[] =[];
  constructor(public translate: TranslateService){
    translate.setDefaultLang('fr');
    translate.addLangs(['en', 'fr']);
    translate.use('fr');
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
  }
}
