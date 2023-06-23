// node v18.16.0
// npm v6.14.18
// primeng v16.0.0

import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import { Parameter, ParametersGroup } from './model/parameters-group';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front';

  // xml: ParametersGroup;

  parameters: Array<Parameter>;

  constructor(private service: DataService) {
    // this.xml = this.service.data;
    this.parameters = [];

    //empty (because of promise)
    console.log(this.service.data);
  }

  ngOnInit(): void {
  }

  load(){
    // this.xml = this.service.data;
    this.parameters = this.service.allFlatParam(this.service.data);
    console.log(this.parameters);
    if(this.service.data.parameters)
    this.parameters = this.service.data.parameters;
  }

  print(){
    //filled (promise finished)
    // console.log(this.service.data);
    if (this.service.data.ParametersGroup){
      console.log(this.service.data.ParametersGroup[0])
    }
  }
}