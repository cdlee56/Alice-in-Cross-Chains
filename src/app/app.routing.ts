import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { PrecinctComponent } from './precinct/precinct.component';
import { ActorComponent } from './actor/actor.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { ActionsComponent } from './actions/actions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'newPrecinct', component: PrecinctComponent, pathMatch: 'full' },
  { path: 'actor', component: ActorComponent, pathMatch: 'full' },
  { path: 'precinct/:ID', component: EvidenceComponent, pathMatch: 'full' },
  { path: 'evidence/:ID', component: ActionsComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
