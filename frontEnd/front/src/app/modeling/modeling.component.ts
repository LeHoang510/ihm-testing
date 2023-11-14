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

  value: any;

  modelingOptions: any[] = [
    { icon: 'pi pi-align-left', justify: 'Left' },
    { icon: 'pi pi-align-right', justify: 'Right' },
    { icon: 'pi pi-align-center', justify: 'Center' },
    { icon: 'pi pi-align-justify', justify: 'Justify' }
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

  changeContent(button: string){

  }
}
