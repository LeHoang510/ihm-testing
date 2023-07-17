import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { XmlComponent } from './components/xmlView/xml/xml.component';

const routes: Routes = [

  {
    path:"menu",
    component: MenuComponent
  },
  
  {
    path:"xmlView",
    component: XmlComponent
  },

  {
    path:"**",
    redirectTo:"menu"
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
