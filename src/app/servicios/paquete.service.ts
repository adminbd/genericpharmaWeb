import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paquete } from '../interfaces/paquete.interface';
import { environment } from '../../environments/environment';
let headers = new HttpHeaders({
    'Conten-Type': 'application/json'
});

@Injectable()
export class PaqueteService {
    constructor(private http: HttpClient) { }

    getPaquetes() {
        return this.http.get(environment.apiURL + 'Paquete/GetPackages').toPromise();
    }

    nuevoPaquete(pkg: Paquete) {
        return this.http.post(environment.apiURL + 'Paquete/Post', pkg, { headers });
    }

    editarPaquete(pkg: Paquete) {
        return this.http.put(environment.apiURL + '/Paquete/' + pkg.id, pkg, { headers });
    }

    eliminarPaquete(id: number) {
        return this.http.delete(environment.apiURL + 'Paquete/Delete/' + id);
    }
}