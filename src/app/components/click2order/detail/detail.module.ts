import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';


import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    DetailRoutingModule, SweetAlert2Module.forRoot()
  ]
})
export class DetailModule { }
