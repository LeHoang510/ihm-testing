import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { InteractoModule } from 'interacto-angular';
import { HomeComponent } from './home/home.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { ModelingComponent } from './modeling/modeling.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Start of Hoang module
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LocalisationComponent } from './modeling/localisation/localisation.component';
import { ModelisationComponent } from './modeling/modelisation/modelisation.component';
import { TabViewModule } from 'primeng/tabview';
import { HistoriqueComponent } from './modeling/historique/historique.component';
import { PrevisionComponent } from './modeling/prevision/prevision.component';
import { RessourceComponent } from './modeling/ressource/ressource.component';
import { MapComponent } from './modeling/localisation/map/map.component';
import { SelectButtonModule } from 'primeng/selectbutton';

// End of Hoang module
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ModelingComponent,
    SettingsComponent,
    LoginComponent,
    LocalisationComponent,
    ModelisationComponent,
    HistoriqueComponent,
    PrevisionComponent,
    RessourceComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TreeTableModule,
    InteractoModule,
    DropdownModule,
    InputSwitchModule,
    SelectButtonModule,
    TabViewModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
