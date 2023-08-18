import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailcategoryRoutingModule } from './detailcategory-routing.module';
import { DetailcategoryComponent } from './detailcategory.component';


import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailcategoryComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    DetailcategoryRoutingModule, SweetAlert2Module.forRoot()
  ]
})
export class DetailcategoryModule { }
