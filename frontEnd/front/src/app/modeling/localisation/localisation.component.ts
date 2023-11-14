import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})
export class LocalisationComponent implements OnInit{
  checked: boolean = false;

  ngOnInit() {
    this.checked = false;
  }

}
