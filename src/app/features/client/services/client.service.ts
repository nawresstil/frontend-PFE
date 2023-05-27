import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../../../models/client';
import {Society} from "../../../models/society";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../../login/services/authentification.service";


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient, private authService: AuthenticationService) { }



  public getClientById(clientId) {
    return this.http.get(environment.baseUrl +`/clients/${clientId}`);
  }



  public getClients(){
    // const headers = new HttpHeaders({authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/clients/all`);
  }

}
