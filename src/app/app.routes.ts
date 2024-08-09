import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SearchTicketComponent } from './search-ticket/search-ticket.component';
import { BuyingProcessComponent } from './buying-process/buying-process.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'consulta', component: SearchTicketComponent},
    {path: 'compra', component: BuyingProcessComponent},
];
