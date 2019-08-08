import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants';
import { Articulo } from '../interfaces/articulo.interface';
const requestArti = "Articulos/";

@Injectable()
export class ArticulosService {
  constructor(private http: HttpClient) { }


  getArticulos() {
    return this.http.get(API_URL + requestArti);
  }

  getPaquete() {
    const request = "Paquete/";
    return this.http.get(API_URL + request);
  }

  getClasificacion() {
    const request = "Clasificacion/";
    return this.http.get(API_URL + request);
  }

  nuevoArticulo(articulo: Articulo) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(API_URL + requestArti, articulo, { headers });
  }

}
