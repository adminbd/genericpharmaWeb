import { Component } from '@angular/core';
import { SessionService } from '../../../servicios/session.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    userData: any = {};
    userName: string;
    constructor(private _sessionService: SessionService) {
        this.userData = this._sessionService.getSession();
        this.userName = this.userData.name + ' ' + this.userData.lastName;
    }

}