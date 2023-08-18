import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { Yeoman } from '@app/services/yeoman.service';
import { Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { ExistenciaService } from '@app/services/existencia-service.service';
import { DataApiService } from '@app/services/data-api.service';

declare const XM_Popup: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  existencias: any[] = []; 
  all: any[] = []; 
  allcategory: any[] = []; 
  existenciasSize:number=0;
  allSize:number=0;


  constructor( public existenciaService:ExistenciaService,
   
 public router:Router,
 public authRESTService:AuthRESTService,
    public script:ScriptService,public yeoman:Yeoman,
    public dataApiService:DataApiService
  ) { 
    this.dataApiService.getAllProducts().subscribe(response=>{
      this.yeoman.all=response;
      this.allSize=this.yeoman.all.length;

    });
    this.dataApiService.getAllCategory().subscribe(response=>{
      this.yeoman.allcategory=response;
      this.yeoman.allCategoriesSize=this.yeoman.allcategory.length;

    });
    this.obtenerExistencias();
    if(!this.authRESTService.getCurrentUser() ){this.router.navigate(['/login'])}
     this.script.load(
  
      //  'global',
      //  'select',
      //  'chart',
      //  'custom',
      //  'deznav',
      //  'owl',
      //  'peity',
      //  'apex',
      //  'dashboard'
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
  ngOnInit(): void {
  }

}
