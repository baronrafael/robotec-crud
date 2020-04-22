import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [PagesComponent, DashboardComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
