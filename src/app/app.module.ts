import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { ContractService, Web3Service } from '../services/services';
import { HomeComponent } from './home/home.component';

import {routing} from './app.routing';
import { PrecinctComponent } from './precinct/precinct.component';
import { ActorComponent } from './actor/actor.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { ActionsComponent } from './actions/actions.component';
import { EvidenceFormComponent } from './evidence-form/evidence-form.component';
import { ActionFormComponent } from './action-form/action-form.component'

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
    ActorComponent,
    EvidenceComponent,
    ActionsComponent,
    EvidenceFormComponent,
    ActionFormComponent,
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
