import { Injectable } from '@angular/core';
import { Parameter, ParametersGroup } from '../model/parameters-group';
import { Parser,Builder} from 'xml2js';
import { XmlService } from './xml.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private xmlData: string = "";

  public xmlPath:string = "";

  constructor(private requestService: XmlService) {

  }

  requestXml(){
	this.requestService.getXml(this.xmlPath)
    .then(xml=>{
		this.xmlData=xml;
		console.log(this.xmlData);
	})
    .catch(err=>{console.log(err)})
  }


  async parseXml(xmlString: string) {
    const parser = new Parser({
      "trim": true,
      "mergeAttrs": true,
	  explicitArray:false,
    });
    return await new Promise((resolve, reject) => parser.parseString(xmlString, (err: any, jsonData: any) => {
      if (err) {
        reject(err);
      }
      resolve(jsonData);
    }));
  }

  public async getJSONData(): Promise<ParametersGroup> {
	return this.parseXml(this.xmlData)
	.then((res: any) => {
	  return res.ParametersGroup as ParametersGroup;
	})
	// .then(group => {
	// 	this.setParent(group);
	// 	return group;
	// });
  }

//   private setParent(param: ParametersGroup | Parameter, parent?: ParametersGroup): void {
// 	param.parent = parent;
// 	if(!("type" in param)) {
// 		param.ParametersGroup?.forEach(g => {
// 			this.setParent(g, param);
// 		});
// 		param.parameters?.forEach(sub => {
// 			this.setParent(sub, param);
// 		});
// 	}
//   }

  jsonToXml(json:any){
	const options ={
		attrkey:"$",
		rootName: "ParametersGroup",
		headless: true,
	}
	const builder = new Builder(options);
	const xmlData = builder.buildObject(json);
	console.log(xmlData);
  }
}
