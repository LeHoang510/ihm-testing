import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { XmlComponent } from './components/xmlView/xml/xml.component';
import { ResultComponent } from './components/result/result.component';
import { HomeComponent } from './home/home.component';

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
    path: "home",
    component: HomeComponent
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
