import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { XmlService } from 'src/app/service/xml.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  xmlNames:string [];
  constructor(private requestService: XmlService, private data: DataService, private router: Router){
    this.xmlNames = [];
    this.requestService.getXmlNames() // we request all xml names 
    .then(names => {
      this.xmlNames = names;
    })
    .catch(err => { console.log(err) })
  }

  sendXmlName(){
    const e = document.getElementById("xml-select") as HTMLSelectElement;
      console.log(e.options[e.selectedIndex].text); 
      this.data.xmlPath = e.options[e.selectedIndex].text; // we change the path of the request for the xml
      this.router.navigateByUrl("/xmlView");
  }

}
