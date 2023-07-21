import { Injectable } from '@angular/core';
import { Parameter, ParametersGroup } from '../model/parameters-group';
import { Parser} from 'xml2js';
import * as jsXmlParse from 'json-xml-parse';
import { XmlService } from './xml.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private xmlData: string;

  public xmlPath:string = "";

  constructor(private requestService: XmlService) {

	this.xmlData = "";


	// this.requestService.getXml(this.xmlPath)
    // .then(xml=>{
	// 	this.xmlData=xml;
	// })
    // .catch(err=>{console.log(err)})
;


  }

  requestXml(){
	this.requestService.getXml(this.xmlPath)
    .then(xml=>{
		this.xmlData=xml;
		console.log(this.xmlData);
	})
    .catch(err=>{console.log(err)})
  }


  renameTags(v: string): string {
    switch(v) {
      case "Parameter":
        return "parameters";
    }
    return v;
  }

  async parseXml(xmlString: string) {
    const parser = new Parser({
      "trim": true,
      "mergeAttrs": true,
      tagNameProcessors: [this.renameTags],
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
	.then(group => {
		this.setParent(group);
		return group;
	});
  }

  private setParent(param: ParametersGroup | Parameter, parent?: ParametersGroup): void {
	param.parent = parent;
	if(!("type" in param)) {
		param.ParametersGroup?.forEach(g => {
			this.setParent(g, param);
		});
		param.parameters?.forEach(sub => {
			this.setParent(sub, param);
		});
	}
  }

  jsonToXml(json:any){
	const options = {
		beautify: true,
		selfClosing: true,
		attrKey: "name",
		// attrKey: "name",
		entityMap: {
		  '"': "&#34;",
		  "&": "&#38;"
		},
		declaration: {
		  encoding:'UTF-8',
		  standalone: 'no'
		}
	  }
	const xml = jsXmlParse.jsXml.toXmlString(options,json);
	console.log(xml);
  }

//   jsonToXml(json:any){
// 	const builder = new Builder();
// 	const xmlData = builder.buildObject(json);
// 	console.log(xmlData);
//   }
}
