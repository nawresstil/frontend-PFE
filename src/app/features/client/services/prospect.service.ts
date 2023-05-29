import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Prospect} from '../../../models/prospect';
import {Society} from '../../../models/society';
import {AuthenticationService} from "../../../login/services/authentification.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProspectService {


  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getProspectById(prospectId) {
    return this.http.get(environment.baseUrl +`/prospects/${prospectId}`);
  }
    public getProspect(){
    return this.http.get(environment.baseUrl +`/prospects/all`);
  }

  public deleteProspect(prospectId: number){
    return this.http.delete(environment.baseUrl +`/prospects/delete/${prospectId}`);
  }
}
