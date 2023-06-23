import { Injectable } from '@angular/core';
import { Parameter, ParametersGroup } from '../model/parameters-group';
import { flatMap } from 'rxjs';
import {Parser} from 'xml2js';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  data: ParametersGroup;

  xmlData: string;

  constructor() { 

    //********************données codées en dure
    // this.data = {
    //   name: "display_options",
		// 	parameters:[{
		// 		name: "box",
		// 		description: "description of the box",
		// 		possible_values: ["1.0","2.5","3.1"],
		// 		type: "double",
		// 		value: "1.0",
		// 		default_value: "1.0"
		// 	},
		// 	{
		// 		name: "function",
		// 		description: "truc bizarre",
		// 		possible_values: ["machin","muche","yaaaa"],
		// 		type: "string",
		// 		value: "machin",
		// 		default_value: "machin"
		// 	}],
    //   pg:
    //   [{
    //     name: "windows_1",
    //     parameters:[
    //       {
    //         name: "box",
    //         description: "description of the box",
    //         possible_values: ["1.0","2.5","3.1"],
    //         type: "double",
    //         value: "1.0",
    //         default_value: "1.0"
    //       },
    //       {
    //         name: "function",
    //         description: "truc bizarre",
    //         possible_values: ["machin","muche","yaaaa"],
    //         type: "string",
    //         value: "machin",
    //         default_value: "machin"
    //       }
    //     ],
		// 		pg:
		// 		[{
		// 			name:"test",
		// 			parameters:[
		// 			{
    //         name: "box",
    //         description: "description of the box",
    //         possible_values: ["1.0","2.5","3.1"],
    //         type: "double",
    //         value: "1.0",
    //         default_value: "1.0"
    //       },
    //       {
    //         name: "function",
    //         description: "truc bizarre",
    //         possible_values: ["machin","muche","yaaaa"],
    //         type: "string",
    //         value: "machin",
    //         default_value: "machin"
    //       }
		// 			]
		// 		}]
    //   },
   	//  ]
    // };
    //******************** 

  this.xmlData = `

  <ParametersGroup name="windows_1">
  <Parameter name="box">
    <description>description of the box</description>
    <possible_values>NO; FRAC_2D, FRAC_2D_FLOW; FRAC_3D; FRAC_3D_FLOW; MSFRAC; GRID; POROUS; POROUS_TRACKER</possible_values>
    <type>string</type>
    <value>NO</value>
    <default_value>NO</default_value>
  </Parameter>
  <Parameter name="function">
    <description>NETWORK_2D</description>
    <possible_values>NO; NETWORK_2D; NETWORK_2D1; NETWORK_2D2 ; FLOW_2D; FLOW_2D1; FLOW_2D2; HEAD_2D</possible_values>
    <type>string</type>
    <value>NO</value>
    <default_value>NO</default_value>
  </Parameter>
  </ParametersGroup>
`;



  //   this.xmlData =  `
  //   <ParametersGroup name="PARADIS_inputs">
  //   <ParametersGroup name="run_global">
  //     <ParametersGroup name="display_options">
  //       <ParametersGroup name="windows_1">
  //         <Parameter name="box">
  //           <description>description of the box</description>
  //           <possible_values>NO; FRAC_2D, FRAC_2D_FLOW; FRAC_3D; FRAC_3D_FLOW; MSFRAC; GRID; POROUS; POROUS_TRACKER</possible_values>
  //           <type>string</type>
  //           <value>NO</value>
  //           <default_value>NO</default_value>
  //         </Parameter>
  //         <Parameter name="function">
  //           <description>NETWORK_2D</description>
  //           <possible_values>NO; NETWORK_2D; NETWORK_2D1; NETWORK_2D2 ; FLOW_2D; FLOW_2D1; FLOW_2D2; HEAD_2D</possible_values>
  //           <type>string</type>
  //           <value>NO</value>
  //           <default_value>NO</default_value>
  //         </Parameter>
  //       </ParametersGroup>
  //     </ParametersGroup>
  //   </ParametersGroup>
  // </ParametersGroup>
  // `
  this.data = {
    name: ["Empty data"],
    parameters: []
 }

  this.parseXml(this.xmlData)
  .then((res: any) => {
    this.data = res.ParametersGroup as ParametersGroup;
    // console.log(this.data);
    // console.log(this.data.name);
    // if(this.data.parameters)
    // console.log(this.data.parameters[0]);
  });

  
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


  allFlatParam(file: ParametersGroup): Array<Parameter> {
    if (file) {
      if (file.pg) {
        if (file.parameters) {
          return [...file.parameters, ...file.pg.flatMap(pg2 => this.allFlatParam(pg2))];
        } else {
          return file.pg.flatMap(pg2 => this.allFlatParam(pg2));
        }
      } else if (file.parameters) {
        return file.parameters;
      }
    }
    return [];
  }

}
