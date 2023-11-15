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

  activeIndex: number = 0;

  buttons = [
    { label: 'Location', index: 0 },
    { label: 'Suivi de la ressource en eau', index: 1 },
    { label: 'Modélisation', index: 2 },
    { label: 'Historique', index: 3 },
    { label: 'Prévisions saisionières', index: 4 }
  ];

  ngOnInit() {
    this.selections = [
      { name: 'New York'},
      { name: 'Rome'},
      { name: 'London'},
      { name: 'Istanbul'},
      { name: 'Paris'}
    ];
  }

}
