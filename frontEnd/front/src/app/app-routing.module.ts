import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ //indicate which component to load depending on the path


  {
    path: "home",
    component: HomeComponent
  },
  {
    path:"**",
    redirectTo:"home"
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
