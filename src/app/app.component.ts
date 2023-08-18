import { Component ,AfterViewInit, ViewChild} from '@angular/core';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { Butler } from '@services/butler.service';
import { Yeoman } from './services/yeoman.service';
import { HttpClient } from  '@angular/common/http';
import { DataApiService } from './services/data-api.service';
import { DemoFilePickerAdapter } from  './file-picker.adapter';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import Swal from 'sweetalert2'

import {CATEGORIES} from '@app/services/categories.service';
import { Router } from '@angular/router';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { AuthRESTService } from './services/authREST.service';

declare const XM_Popup: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  existencias: any[] = []; 
  existenciasSize:number=0;
  @ViewChild('deleteSwal')
  categories: any;
  // public readonly deleteSwal!: SwalComponent;
  popup: any;
  popupStyle = {
    position: 'absolute',
    left: '50%',
    zIndex: '100001',
    opacity: '0',
    visibility: 'hidden',
    transform: 'translate(0px, -40px)',
    transition: 'transform 0.3s ease-in-out 0s, opacity 0.3s ease-in-out 0s, visibility 0.3s ease-in-out 0s',
    top: '0px',
    marginLeft: '-492px'
  };

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
    idBranch: ''
  };
  branchOptions = [
    // {
    //   name: 'Accesorios',
    //   images: ['assets/assetsdash/images/profile/profile.png'],
    //   idBranch: 'ca000001'
    // },
    // {
    //   name: 'Herramientas',
    //   images: ['assets/assetsdash/images/profile/profile.png'],
    //   idBranch: 'ca000002'
    // },
    // {
    //   name: 'Hogar',
    //   images: ['assets/assetsdash/images/profile/profile.png'],
    //   idBranch: 'ca000003'
    // },
    // {
    //   name: 'Tecnología',
    //   images: ['assets/assetsdash/images/profile/profile.png'],
    //   idBranch: 'ca000004'
    // }
    
  ];

  runButtonClicked() {
    // (window as any).r();
    // this.popup.r();
    // XM_Popup.r();
    this.popupStyle.opacity = '1';
    this.popupStyle.visibility = 'hidden';
    // Otros cambios de estilo necesarios al hacer clic en el botón
  }
  closePopup() {
  //  XM_Popup().cerrarPopupPorId(id);
  }



public getProducts(){
  this.dataApiService.getAllProducts().subscribe(response => {
    // this.ngxService.stop("loader-01");
  this.yeoman.products = response;
  this.yeoman.products.reverse();

  });
}

  onSubmit() {

   
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();

    this.data.images=this._butler.carImages;
    this.dataApiService.saveProduct(this.data).subscribe(response=>{
      console.log(response);
      this._butler.carImages=[];
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
       this.getProducts();
    });
    // Aquí puedes enviar los datos al servidor o realizar las acciones necesarias
    console.log(this.data);
    
  
  }

  products$:any={};
  title = 'vk';
  adapter = new  DemoFilePickerAdapter(this.http,this._butler);
  constructor(
    public existenciaService:ExistenciaService,
    private http: HttpClient,
 public router:Router,
   // private formBuilder: FormBuilder,
 //   private ngxService: NgxUiLoaderService,
    public _butler:Butler,
    public yeoman:Yeoman,
    public dataApiService: DataApiService,
    public authRESTService:AuthRESTService,
    public script:ScriptService
  ){

    this.yeoman.user=this.authRESTService.getCurrentUser();
    this._butler.data=this.data;
// this.dataApiService.getAllProducts().subscribe(response => {
//     // this.ngxService.stop("loader-01");
//   this.products$ = response
//   });
this.script.load(
  
    // 'global',
    // 'select',
    // 'chart',
    // 'custom',
    // 'deznav',
    // 'owl',
    // 'peity',
    // 'apex',
    // 'dashboard'
   )
   .then(data => {
   })
   .catch(error => console.log(error));
  
  }
  config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: true,
    spaceBetween: 5,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };  
  obtenerExistencias() {
    const familia = "%5Bobject+Object%5D";

    this.existenciaService.getAllExistencias(familia).subscribe(
      (data) => {
        this.existencias = data;
        this.yeoman.existencias=null;
        this.yeoman.existencias=this.existencias;
        this.yeoman.existenciasSize=this.existencias.length;
        // Aquí puedes hacer algo con los datos obtenidos, como mostrarlos en el template.
      },
      (error) => {
        // console.error('Error al obtener existencias:', error);
      }
    );
  }
  ngAfterViewInit(): void {
    this.obtenerExistencias();
  }
}
