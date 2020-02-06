import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Articulo } from '../interfaces/articulo.interface';
import { environment } from '../../environments/environment';
let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class ArticulosService {
  constructor(private http: HttpClient) { }


  getArticulos() {
    return this.http.get(environment.apiURL + '/Articulos').toPromise();
  }

  getPaquete() {
    return this.http.get(environment.apiURL + '/Paquete').toPromise();
  }

  getClasificacion() {
    return this.http.get(environment.apiURL + '/Clasificacion').toPromise();
  }

  getProveedor() {
    return this.http.get(environment.apiURL + '/Proveedor');
  }

  nuevoArticulo(articulo: Articulo, file: File) {
    const formData: FormData = new FormData();
    const mData = JSON.stringify(articulo);
    formData.append('data', mData);
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.post(environment.apiURL + '/UploadImage', formData);
  }

  editarArticulo(articulo: Articulo) {
    return this.http.put(environment.apiURL + '/Articulos/' + articulo.id, articulo, { headers });
  }

  eliminarArticulo(idItem: any) {
    return this.http.delete(environment.apiURL + '/Articulos/' + idItem);
  }
}
