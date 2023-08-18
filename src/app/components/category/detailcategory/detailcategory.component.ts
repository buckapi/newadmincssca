import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiService } from '@app/services/data-api.service';
import { Yeoman } from '@app/services/yeoman.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-detailcategory',
  templateUrl: './detailcategory.component.html',
  styleUrls: ['./detailcategory.component.css']
})
export class DetailcategoryComponent implements OnInit {

  constructor
    (public yeoman:Yeoman,
    public router:Router,
    public dataApiService:DataApiService
    ) 
    { 
      //  if(this.yeoman.preview.images[0]===undefined){this.router.navigate([''])}
    }
delete(){ 
  this.dataApiService.deleteCategory(this.yeoman.preview.id).subscribe(response=>{
    this.dataApiService.getAllCategory().subscribe(response=>{
      this.yeoman.allcategory=response;
    });
  });
  this.router.navigate(['/cateall']);
}
cancelDelete(){}
  ngOnInit(): void {
  }

}
