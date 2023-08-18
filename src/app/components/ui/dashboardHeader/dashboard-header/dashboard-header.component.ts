import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { AuthRESTService } from '@app/services/authREST.service';
import { Butler } from '@app/services/butler.service';
import { Yeoman } from '@app/services/yeoman.service';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
user:any;
  constructor(
    public authRESTService:AuthRESTService,
    public router:Router,
    public _butler:Butler,
    public yeoman:Yeoman,
    public script:ScriptService
    ) { 
      this.yeoman.user=this.authRESTService.getCurrentUser();
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

    onLogOut(){
      this.authRESTService.logoutUser().subscribe(response=>{
       
      });
      this.router.navigate(['/login']);
    }
  ngOnInit(): void {
  }

}
