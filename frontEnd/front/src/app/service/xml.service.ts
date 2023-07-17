import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})		
export class XmlService {


	constructor(private http: HttpClient){}

	getXmlNames(): Observable<string[]>{
		return this.http.get<string[]>("osur/xml");
  	}

	getXml(name:string): Observable<any>{
		return this.http.get<any>("osur/xml/" + name);
  	}

	runSimulation(): Observable<any[]>{
		return this.http.get<any[]>("osur/run");
  	}
}
