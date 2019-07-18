import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      const url = "http://localhost:1080/api/Articulos/UserInfo";
      return this.http.get(url)
          .subscribe( res => console.log(res));
    }
}