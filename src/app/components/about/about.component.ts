import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {

  constructor(private _contentHeaderService: ContentHeaderService) { }

  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Acerca de')
  }

}
