import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { Yeoman } from '@services/yeoman.service';
import { DemoFilePickerAdapter } from  '@app/file-picker.adapter';
import { HttpClient } from '@angular/common/http';
import { Butler } from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements AfterViewInit {
  @ViewChild('deleteSwal')
  category='Seleccione una';
  categorySeted:boolean=false;
 
  products$:any={};
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes del producto',
      or: '.',
      browse: 'Cargar',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };

  data = {
    images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
    name: '',
    description: '',
    price: null,
    stock: 0,
    ref: '',
    referencia: '',
    idCategory: '',
  };

 
  adapter = new  DemoFilePickerAdapter(this.http,this._butler);
  constructor(
    public router:Router,
    public http:HttpClient,
    public _butler:Butler,
    public dataApiService:DataApiService,
    public yeoman:Yeoman
    ) {

     
this.getAllCategories();

      this._butler.data=this.data;}
      onSubmit() {
        this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
        this.data.images=this._butler.uploaderImages;
        this.dataApiService.saveProduct(this.data).subscribe(response=>{
          console.log(response);
          // this.getAll();
          this._butler.uploaderImages=[];
          this.router.navigate(['c2oAll']);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Información guardada',
            showConfirmButton: false,
            timer: 1500
          })
         
          //  this.getProducts();
        });
        // Aquí puedes enviar los datos al servidor o realizar las acciones necesarias
        console.log(this.data);
        
        }
        getAllCategories(){
          this.dataApiService.getAllCategory().subscribe(response=>{
            this.yeoman.categories=response;
            this.yeoman.allCategoriesSize= this.yeoman.categories.length;
          });
        }
       
        onCategorySelect(category:any) {        
          this.data.idCategory = category.idCategory;
          console.log(category.id);
        }
        
        setCategory(category:any){
          this.categorySeted=true;
          this.data.idCategory=this.yeoman.categories[category].is;
          console.log("selected: "+JSON.stringify(this.yeoman.categories[category].id));
        }
    ngAfterViewInit(): void {
  }

}
