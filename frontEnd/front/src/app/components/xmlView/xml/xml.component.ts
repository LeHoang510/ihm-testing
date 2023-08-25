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
    this.parameters = {name:""};
    if (this.service.xmlPath !="--Please choose an xml--"){
      this.service.requestXml();
    }
  }

  parseIntoJson(){
    if (this.service.xmlPath !== "--Please choose an xml--"){
      this.service.getJSONData()
      .then(data => {
        this.parameters = data;
        console.log(this.parameters);
      });
    }
  }

  jsonToXml(){
    this.service.jsonToXml(this.convertFormat(this.parameters));
  }


  convertFormat(input: any): any {
    const attributes = ["name"];
    if (typeof input === "object") {
      const attributePairs: { [key: string]: string } = {};
      const result: any = {};
  
      for (const [key, value] of Object.entries(input)) { //go through all the elements
        if (attributes.includes(key)) {
          attributePairs[key] = value as string;
        } else if (Array.isArray(value)) {
          const newArray = value.map(item => this.convertFormat(item));
          result[key] = newArray;
        } else if (typeof value === "object") {
          result[key] = this.convertFormat(value);
        } else {
          result[key] = value;
        }
      }
  
      if (Object.keys(attributePairs).length > 0) {
        if (result["$"]) {
          Object.assign(result["$"], attributePairs);
        } else {
          result["$"] = attributePairs;
        }
      }
  
      return result;
    }
    return input;
  }



  runForecast(){
    this.requestService.runSimulation();
  }

}
