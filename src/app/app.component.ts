import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ContentHeaderService } from './servicios/content-header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  fullLayout: boolean = false;

  constructor(private router: Router,
    private _contentHeaderService: ContentHeaderService) { }


  ngDoCheck() {
    this.fullLayout = this.router.url !== '/login' ? false : true;
    if(this.fullLayout) {
      const body = document.getElementsByTagName('body')[0];
      // remove body class admin design
      body.classList.remove('hold-transition');
      body.classList.remove('skin-green');
      body.classList.remove('sidebar-mini');

      // add class for login
      body.classList.add('hold-transition');
      body.classList.add('login-page');
    } else {
      const body = document.getElementsByTagName('body')[0];
      // remove class for login 'login success'
      body.classList.remove('hold-transition');
      body.classList.remove('login-page');

      // add admin template class
      body.classList.add('hold-transition');
      body.classList.add('skin-green');
      body.classList.add('sidebar-mini');
    }
  }

}
