import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})		
export class XmlService { // service used for http requests


	constructor(private http: HttpClient){}

	getXmlNames(): Promise<Array<string>>{
		return lastValueFrom(this.http.get<Array<string>>("http://localhost:5000/getxmlnames"));
	}

	getXml(xmlName:String):Promise<string> {
		return lastValueFrom(this.http.get("http://localhost:5000/getxml/" + xmlName,{ responseType: 'text' }));
  	}

	runCydre(xml:string): Promise<any>{
		return lastValueFrom(this.http.post("http://localhost:5000/run_cydre",xml ,{ responseType: 'text' }));
  	}

	runCydre2(): Observable<any>{
		return this.http.get("http://localhost:5000/run_cydre");
  	}
}
