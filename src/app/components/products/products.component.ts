import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';
import { ProductosService } from '../../servicios/productos.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {
  title = 'Example for Angular 7 DataTable';
  dtOptions: DataTables.Settings = {};
  dtArticulos: any = [];
  // dtUsers =[
  //   {"id": 101, "firstName": "Anil", "lastName": "Singh"},
  //   {"id": 102, "firstName": "Reena", "lastName": "Singh"},
  //   {"id": 103, "firstName": "Aradhay", "lastName": "Simgh"},
  //   {"id": 104, "firstName": "Dilip", "lastName": "Singh"},
  //   {"id": 105, "firstName": "Alok", "lastName": "Singh"},
  //   {"id": 106, "firstName": "Sunil", "lastName": "Singh"},
  //   {"id": 107, "firstName": "Sushil", "lastName": "Singh"},
  //   {"id": 108, "firstName": "Sheo", "lastName": "Shan"},
  //   {"id": 109, "firstName": "Niranjan", "lastName": "R"},
  //   {"id": 110, "firstName": "Lopa", "lastName": "Mudra"},
  //   {"id": 111, "firstName": "Paramanand","lastName": "Tripathi"}
  // ];
  constructor(private _contentHeaderService: ContentHeaderService,
              private _productService: ProductosService) { }

  ngOnInit() {

    this._productService.getProductos().subscribe( res => this.dtArticulos = res);

    this._contentHeaderService.setTitleHeader('Articulos');
    this.dtOptions = {
      data:this.dtArticulos,
      columns: [{title: 'ID', data: 'Id'},
            {title: 'Codigo', data: 'Codigo'},
            {title: 'Nombre', data: 'Nombre' },
            {title: 'Stock', data: 'Stock' }]
    };
  }
}
