import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {

  constructor(private _contentHeaderService: ContentHeaderService) { }

  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Productos');
  }
}
