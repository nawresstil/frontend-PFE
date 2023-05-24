import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  jwt = localStorage.getItem('token');
  username: string ;
  roles: string [] ;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  getToken(){
    return localStorage.getItem('token');
  }
  login(data) {

    return this.http.post(environment.baseUrl + '/auth/authenticate', data, {observe: 'response'});

  }

  getprofile() {
    const headers = new HttpHeaders({authorization: 'Bearer ' + this.jwt});
    return this.http.get<any>(environment.baseUrl + '/user/users/', {headers});
  }

  parseJWT() {
    const objJWT = this.jwt ? this.jwtHelper.decodeToken(this.jwt) : {};
    /*    const jwtHelper = new JwtHelperService();
        const objJWT = jwtHelper.decodeToken(this.jwt);*/
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }


  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();

  }

  logout() {
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
