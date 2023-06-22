// node v18.16.0
// npm v6.14.18
// primeng v16.0.0

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './service/data.service';
import { TableModule } from 'primeng/table';
import { Parameter, ParametersGroup } from './model/parameters-group';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front';

  xml: ParametersGroup;

  parameters: Array<Parameter>;

  constructor(private service: DataService, /*private http: HttpClient*/) {
    this.xml = this.service.data;
    this.parameters = this.service.allFlatParam3(this.xml);
    // console.log(this.parameters);
  }

  ngOnInit(): void {
  }
}