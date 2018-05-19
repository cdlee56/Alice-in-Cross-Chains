import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { PrecinctComponent } from './precinct/precinct.component';
import { ActorComponent } from './actor/actor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'newPrecinct', component: PrecinctComponent, pathMatch: 'full' },
  { path: 'actor', component: ActorComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
