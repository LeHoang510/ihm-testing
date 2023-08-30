import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { XmlComponent } from './components/xmlView/xml/xml.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [ //indicate which component to load depending on the path

  {
    path:"menu",
    component: MenuComponent
  },
  
  {
    path:"xmlView",
    component: XmlComponent
  },

  {
    path:"result",
    component:ResultComponent
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
