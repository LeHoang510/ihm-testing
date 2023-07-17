import { Component, Input, OnInit } from '@angular/core';
import { Parameter, ParametersGroup } from '../../../model/parameters-group';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  // @Input() in order to give the variable a value from the html
  @Input() parameters: Array<Parameter|ParametersGroup>;


  constructor(){
    this.parameters=[];
  }

  isParameter(element:any): element is Parameter{
    return (element as any).description !== undefined;
  }

  existParamGroup(element: any) : boolean{
    return (element as any).ParametersGroup !== undefined;

  }

  existParam(element:any) : boolean{
    return (element as any).parameters !== undefined;
  }

}
