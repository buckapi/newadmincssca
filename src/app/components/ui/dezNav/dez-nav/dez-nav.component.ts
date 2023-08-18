import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';

@Component({
  selector: 'app-dez-nav',
  templateUrl: './dez-nav.component.html',
  styleUrls: ['./dez-nav.component.css']
})
export class DezNavComponent implements OnInit {

  constructor( public router:Router,
    public script:ScriptService) {
      this.script.load(
  
        // 'global',
        // 'select',
        // 'chart',
        // 'custom',
       //  'deznav',
        // 'owl',
        // 'peity',
        // 'apex',
         //'dashboard'
       )
       .then(data => {
       })
       .catch(error => console.log(error));

     }

  ngOnInit(): void {
  }

}
