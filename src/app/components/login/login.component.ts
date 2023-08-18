import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserInterface } from '@interfaces/user-interface'; 
import { Butler } from '@app/services/butler.service';
import{NgxUiLoaderService} from 'ngx-ui-loader';

declare var NgForm:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngFormLogin: FormGroup;
  submitted = false;
  returnUrl: any;
  public isError = false;
  public isLogged =false;
  message:any="Error en datos de acceso"; 
  constructor(

    private ngxService: NgxUiLoaderService,
    public router:Router,
    public _butler:Butler,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public AuthRESTService:AuthRESTService

  ) {
    this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });

   }
  public user : UserInterface ={
    name:"",
    email:"",
    password:""
  }; 

  
  ngOnInit(): void {
    this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.ngFormLogin.controls;
  }
  onIsError(): void {
    // this.ngxService.stop("loader-02");
  this.isError = true;

  this.ngxService.stop("loader-02");
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}
  onLoggedin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      // Accede a la propiedad 'email' usando corchetes
      this.router.navigate(['']);
    }
  }
  onLogin(){

    this.submitted = true;
    if (this.ngFormLogin.invalid) {
      return;
    } 
     this.ngxService.start("loader-02");
    return this.AuthRESTService.loginUser(
      this.ngFormLogin.value.email, 
      this.ngFormLogin.value.password
    )
    .subscribe( 
      data => {
        //console.log(data);
        this.AuthRESTService.setUser(data.user);
        const token = data.id;
        this.AuthRESTService.setToken(token);
        this._butler.userd="p"+data.userId;
        this._butler.isLogged=true;
        // this.dataApiService.getCardByUserId(this._butler.userd).subscribe(
        //   data =>{
        //     this._butler.userActive=data;
        //     this._butler.userId=this._butler.userActive[0].id;
        //     this._butler.infoProfile=this._butler.userActive[0];
        //     this._butler.type=this._butler.userActive[0].userType;
        //     this._butler.userType=this._butler.userActive[0].userType;
        //     this._butler.images=this._butler.userActive[0].images;
        //     this._butler.name=this._butler.userActive[0].name;
        //     this._butler.email=this._butler.userActive[0].email;
        //     this._butler.profileStatus=this._butler.userActive[0].profileStatus;
        //     if(this._butler.type=='member'){
        //       this.getPartsById();
        //       this.getCarsById();
        //     } 
        //     if(this._butler.type=='admin'){
        //       this.getCards();
        //       this.getProducts();
        //       this.getCars();
        //     }
        //     if(this._butler.profileStatus==="pending" || this._butler.profileStatus==="medium"){
        //       this.router.navigate(['general/profile']);
        //     }
        //     if(this._butler.profileStatus==="complete"){
        //     this.router.navigate(['dashboard']);
        //     }
        //   });       
        this._butler.name=data.name;
        this.isError = false;
        this.router.navigate(['']);
         this.ngxService.stop("loader-02");
        localStorage.setItem('isLoggedin', 'true');
        console.log("profile status: "+this._butler.profileStatus);
        
      },
       error => this.onIsError()
    ); 

  }

}
