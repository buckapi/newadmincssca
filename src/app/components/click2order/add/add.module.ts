import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FilePickerModule } from  'ngx-awesome-uploader';

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    FilePickerModule,
    HttpClientModule,
     CommonModule,
    AddRoutingModule,FormsModule
  ],exports:[FilePickerModule]
})
export class AddModule { }
