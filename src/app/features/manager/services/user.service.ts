import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Users} from "../../../models/users";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../../login/services/authentification.service";
import {RegisterRequest} from "../../../models/registerRequest";
import {AuthenticationResponse} from "../../../models/authenticationResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }



  forgotPassword(email: string): Observable<Users> {
    return this.http.post<Users>(environment.baseUrl+`/user/forgot-password`, email);
  }

  getUsers(){
    return this.http.get(environment.baseUrl+`/user/all`);
  }

  public updateUser(userId: number, user: Users): Observable<Users> {
    return this.http.put<Users>(environment.baseUrl+`/user/update/${userId}`, user);
  }
  // public registerUser(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
  //   return this.http.post<AuthenticationResponse>(environment.baseUrl+`auth/register`, registerRequest);
  // }
  // registerUser(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
  //     const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
  //   return this.http.post<AuthenticationResponse>(environment.baseUrl+`/auth/register`, registerRequest, {headers});
  // }
  public registerUser(registerRequest:RegisterRequest) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post(environment.baseUrl+`auth/register`, registerRequest, {headers});
  }
  public deleteUser(userId){
    return this.http.delete(environment.baseUrl+`/user/delete/${userId}`);
  }
  getConnectedUser(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl+`/user/profile`, {headers});
  }
}
