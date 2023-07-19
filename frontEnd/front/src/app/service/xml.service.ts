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

	getXml(): Promise<any>{
		return lastValueFrom(this.http.get<any>("http://localhost:5000/getxml"));
  	}

	runSimulation(): Observable<any[]>{
		return this.http.get<any[]>("osur/run");
  	}
}
