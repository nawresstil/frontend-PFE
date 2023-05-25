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
  private url = 'http://localhost:8081';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }



  public getClientById(clientId: number) {
    return this.http.get(`${this.url}/clients/${clientId}`);
  }



  public getClients(): Observable<Client[]> {
    const headers = new HttpHeaders({authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get<Client[]>(environment.baseUrl +`/clients/all`, {headers});
  }

}