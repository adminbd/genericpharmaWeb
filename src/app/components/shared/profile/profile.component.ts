import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../servicios/session.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userData: any = {};
  userName: string;
  constructor(private _sessionService: SessionService) { }

  ngOnInit() {
    this.userData = this._sessionService.getSession();
    this.userName = this.userData.name + ' ' + this.userData.lastName;
  }

}
