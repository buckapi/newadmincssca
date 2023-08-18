import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailcategoryComponent } from './detailcategory.component';

const routes: Routes = [{ path: '', component: DetailcategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailcategoryRoutingModule { }
