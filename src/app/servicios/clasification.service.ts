import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clasificacion } from '../interfaces/clasificacion.interface';
import { environment } from '../../environments/environment';
let headers = new HttpHeaders({
    'Conten-Type': 'application/json'
});

@Injectable()
export class ClasificationService {
    constructor(private http: HttpClient) { }

    getClasificaciones() {
        return this.http.get(environment.apiURL + '/Clasificacion').toPromise();
    }

    nuevaClasificacion(clas: Clasificacion) {
        return this.http.post(environment.apiURL + '/Clasificacion', clas, { headers });
    }

    editarClasificacion(clas: Clasificacion) {
        return this.http.put(environment.apiURL + '/Clasificacion/' + clas.id, clas, { headers });
    }

    eliminarClasificacion(idClas: any) {
        return this.http.delete(environment.apiURL + '/Clasificacion/' + idClas);
    }
}