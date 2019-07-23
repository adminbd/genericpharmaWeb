import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constants';
 
@Injectable()
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos() {
    const request = "Articulo/"
    return this.http.get(API_URL + request);
  }
}
