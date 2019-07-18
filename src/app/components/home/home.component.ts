import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';
import { SessionService } from '../../servicios/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private _contentHeaderService: ContentHeaderService,
              private _sessionService: SessionService) {
  }

  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Pagina principal');
    this._sessionService.getUsers();
  }

}
