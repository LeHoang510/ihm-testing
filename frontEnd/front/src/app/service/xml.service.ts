import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})		
export class XmlService {


	constructor(private http: HttpClient){}

	getXmlNames(): Promise<Array<string>>{
		return lastValueFrom(this.http.get<Array<string>>("http://localhost:5000/getxmlnames"));
	}

	getXml(xmlName:String):Promise<string> {
		return lastValueFrom(this.http.get("http://localhost:5000/getxml/" + xmlName,{ responseType: 'text' }));
  	}

	runSimulation(): Observable<any[]>{
		return this.http.get<any[]>("osur/run");
  	}
}
