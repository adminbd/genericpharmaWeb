import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proveedor } from '../interfaces/proveedor.interface';
import { environment } from '../../environments/environment';
let headers = new HttpHeaders({
    'Conten-Type': 'application/json'
});

@Injectable()
export class ProveedorService {
    constructor(private http: HttpClient) { }

    getProveedores() {
        return this.http.get(environment.apiURL + '/Proveedor').toPromise();
    }

    getPaises() {
        return this.http.get(environment.apiURL + '/Pais').toPromise();
    }

    nuevoProveedor(supplier: Proveedor) {
        return this.http.post(environment.apiURL + '/Proveedor', supplier, { headers });
    }

    editarProveedor(supplier: Proveedor) {
        return this.http.put(environment.apiURL + '/Proveedor/' + supplier.id, supplier, { headers });
    }

    eliminarProveedor(idSupplier: any) {
        return this.http.delete(environment.apiURL + '/Proveedor/' + idSupplier);
    }
}