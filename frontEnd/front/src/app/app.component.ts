import { Component, OnInit } from '@angular/core';
import { XmlService } from './xml.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front';

  xml!: string;

  constructor(private service: XmlService) {}

  ngOnInit(): void {
    this.xml = this.service.xml;
  }
}
