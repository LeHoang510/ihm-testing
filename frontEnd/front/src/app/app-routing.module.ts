import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ //indicate which component to load depending on the path
  { path: 'home', component: HomeComponent },
  { path: 'data', component: DataComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
