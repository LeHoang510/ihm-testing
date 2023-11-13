import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { ModelingComponent } from "./modeling/modeling.component";

const routes: Routes = [ //indicate which component to load depending on the path
  { path: 'home', component: HomeComponent },
  { path: 'modeling', component: ModelingComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
