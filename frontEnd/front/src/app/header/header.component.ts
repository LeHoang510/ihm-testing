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
  }
}
