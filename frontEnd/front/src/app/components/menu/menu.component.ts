import { Component, OnInit } from '@angular/core';
import { XmlService } from 'src/app/service/xml.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  xmlNames:string [];
  constructor(private requestService: XmlService){
    this.xmlNames = [];
    this.requestService.getXmlNames()
    .then(names => {
      this.xmlNames = names;
    })
    .catch(err => { console.log(err) })

    this.requestService.getXml()
    .then(xml=>{
      console.log(xml);
    })
    .catch(err=>{console.log(err)})
  }

  ngOnInit(): void {
    
  }
}
