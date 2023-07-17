import { Component } from '@angular/core';
import { ParametersGroup } from 'src/app/model/parameters-group';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent {

  parameters: ParametersGroup;

  constructor(private service: DataService ){
    this.parameters ={name:[""]};
    this.service.getJSONData()
    .then(data => {
      this.parameters = data;
    });
  }

  jsonToXml(){
    this.service.jsonToXml(this.parameters);
  }

}
