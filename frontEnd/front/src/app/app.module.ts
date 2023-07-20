import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/xmlView/header/header.component';
import { BodyComponent } from './components/xmlView/body/body.component';
import { MenuComponent } from './components/menu/menu.component';
import { XmlComponent } from './components/xmlView/xml/xml.component';
import { InteractoModule } from 'interacto-angular';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    MenuComponent,
    XmlComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TreeTableModule,
    InteractoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
