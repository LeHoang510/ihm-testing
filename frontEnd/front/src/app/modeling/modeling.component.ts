import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrls: ['./modeling.component.scss']
})
export class ModelingComponent implements OnInit{
  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    console.log(this.cities);
  }
}
