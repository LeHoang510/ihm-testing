// node v18.16.0
// npm v6.14.18
// primeng v16.0.0


// yml equivalent pour installer toutes les librairies necessaires -> pas besoin car toutes les dependances sont mises dans le package.json

import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import { Parameter, ParametersGroup } from './model/parameters-group';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front';

// @Input() pour pouvoir appeler la variable dans l'html
  @Input() parameters: Array<Parameter|ParametersGroup>;


  constructor(private service: DataService) {
    this.parameters = [];

    //empty (because of promise)
    // console.log(this.service.data);
  }

  ngOnInit(): void {
  }

  load(){
    this.parameters = [...this.service.data.parameters??[],...this.service.data.ParametersGroup??[]]/*this.service.allFlatParam(this.service.data);*/
    console.log(this.parameters);
  }

  // print(){
  //   //filled (promise finished)
  //   // console.log(this.service.data);
  //   if (this.service.data.ParametersGroup){
  //     console.log(this.service.data.ParametersGroup[1])
  //   }
  // }
  
  isParameter(element:any): element is Parameter{
    // console.log(element);
    return (element as any).description !== undefined;
  }

  existParamGroup(element: any) : boolean{
    return (element as any).ParametersGroup !== undefined;

  }

  existParam(element:any) : boolean{
    return (element as any).parameters !== undefined;
  }

  // toggleRow(rowData: ParametersGroup) {
  //   const index = this.expandedRows.indexOf(rowData);
  //   if (index === -1) {
  //     if(rowData.ParametersGroup){
  //       this.expandedRows.push(rowData.ParametersGroup);
  //     }
  //   } else {
  //     this.expandedRows.splice(index, 1);
  //   }
  //   console.log(this.expandedRows);
  // }
}

//...this.service.data.parameters??[],


//*ngIf="!isParameter(parameters)"