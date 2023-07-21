import { Component, OnInit } from '@angular/core';
import { interactoTreeUndoProviders } from 'interacto-angular';
import { ParametersGroup } from 'src/app/model/parameters-group';
import { DataService } from 'src/app/service/data.service';
import { XmlService } from 'src/app/service/xml.service';


@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss'],
  providers: [interactoTreeUndoProviders()]
})
export class XmlComponent{

  parameters: ParametersGroup;

  constructor(private service: DataService,private requestService: XmlService){
    this.parameters ={name:[""]};
    if (this.service.xmlPath !="--Please choose an xml--"){
      this.service.requestXml();
    }
  }

  parseIntoJson(){
    if (this.service.xmlPath !== "--Please choose an xml--"){
      this.service.getJSONData()
      .then(data => {
        this.parameters = data;
      });
    }
  }


  jsonToXml(){
    this.service.jsonToXml(this.parameters);
  }

  runForecast(){
    this.requestService.runSimulation();
  }

}
