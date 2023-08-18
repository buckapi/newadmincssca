import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcategoryRoutingModule } from './addcategory-routing.module';
import { AddcategoryComponent } from './addcategory.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FilePickerModule } from  'ngx-awesome-uploader';

@NgModule({
  declarations: [
    AddcategoryComponent
  ],
  imports: [
    FilePickerModule,
    HttpClientModule,
     CommonModule,
    AddcategoryRoutingModule,FormsModule
  ],exports:[FilePickerModule]
})
export class AddcategoryModule { }
