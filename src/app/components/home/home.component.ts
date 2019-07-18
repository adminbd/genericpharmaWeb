import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private _contentHeaderService: ContentHeaderService) {
  }

  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Pagina principal');
  }

}
