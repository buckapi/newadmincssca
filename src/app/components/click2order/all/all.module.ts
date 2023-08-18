import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRoutingModule } from './all-routing.module';
import { AllComponent } from './all.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    AllComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    AllRoutingModule
  ]
})
export class AllModule { }
