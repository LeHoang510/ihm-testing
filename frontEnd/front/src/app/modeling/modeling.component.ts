import { Component, OnInit } from '@angular/core';

interface Value {
  name: string;
}

@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrls: ['./modeling.component.scss']
})
export class ModelingComponent implements OnInit{
  selections: Value[] | undefined;

  selectedValue: Value | undefined;

  ngOnInit() {
    this.selections = [
      { name: 'New York'},
      { name: 'Rome'},
      { name: 'London'},
      { name: 'Istanbul'},
      { name: 'Paris'}
    ];
  }

  changeContent(button: string){

  }
}
