import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllcategoryRoutingModule } from './allcategory-routing.module';
import { AllcategoryComponent } from './allcategory.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    AllcategoryComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    AllcategoryRoutingModule
  ]
})
export class AllcategoryModule { }
