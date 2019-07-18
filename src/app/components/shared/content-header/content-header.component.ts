import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../../servicios/content-header.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styles: []
})
export class ContentHeaderComponent implements OnInit {
  pageTitle: string;
  constructor(private _contentHeaderService: ContentHeaderService) { }

  ngOnInit() {
    this.pageTitle = this._contentHeaderService.getTitleHeader();
  }

}
