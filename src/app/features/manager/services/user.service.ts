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



  forgotPassword(email){
    // const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post(environment.baseUrl+`/user/forgot-password`, email/*, {headers}*/);
  }

  getUsers(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl+`/user/all`, {headers});
  }

  public updateUser(userId: number, user: Users){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.put<Users>(environment.baseUrl+`/user/update/`+ userId, user, {headers});
  }

  registerUser(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.post<AuthenticationResponse>(environment.baseUrl + '/auth/register', registerRequest, {headers});
  }

  public deleteUser(userId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.delete(environment.baseUrl+`/user/delete/`+ userId,{headers});
  }
  getConnectedUser(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl+`/user/profile`, {headers});
  }
  public getUserById(userId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/user/`+ userId,{headers});
  }
}
