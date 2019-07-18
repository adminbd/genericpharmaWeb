import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../constants';

@Injectable()
export class SessionService {

    user: any = {
      name: 'nuevo',
      lastName: 'usuario',
      imgUrl: 'assets/dist/img/avatar.png'
    }

    constructor(private http: HttpClient) {}

    getSession() {
        return this.user;
    }
        
    getUsers() {
      const request = "Articulos/UserInfo";
      return this.http.get(API_URL + request)
          .subscribe( res => console.log(res));
    }
}