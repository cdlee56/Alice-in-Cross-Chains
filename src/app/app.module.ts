import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { ContractService, Web3Service } from '../services/services';
import { HomeComponent } from './home/home.component';

import {routing} from './app.routing';
import { PrecinctComponent } from './precinct/precinct.component'

const SERVICES = [
  ContractService,
  Web3Service,
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PrecinctComponent,
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
