import { Component, Input } from '@angular/core';
import { Parameter, ParametersGroup } from '../../model/parameters-group';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  // @Input() pour pouvoir appeler la variable dans l'html
  @Input() parameters: Array<Parameter|ParametersGroup>;


  constructor(private bodyService: DataService ){
    this.parameters = [];
  }

  load(){
    this.parameters = [...this.bodyService.data.parameters??[],...this.bodyService.data.ParametersGroup??[]]/*this.service.allFlatParam(this.service.data);*/
    console.log(this.parameters);
  }

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
}
