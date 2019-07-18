import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../servicios/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {
  userData: any = {};
  userName: string;
  constructor(private _sessionService: SessionService) {
    this.userData = this._sessionService.getSession();
    this.userName = this.userData.name + ' ' + this.userData.lastName;
  }

  ngOnInit() {
  }

}
