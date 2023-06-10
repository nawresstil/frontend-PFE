import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../../login/services/authentification.service";
import {environment} from "../../../../environments/environment";
import {TacheS} from "../../../models/tasks/tache";
import {Action} from "../../../models/action";

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getAllActions(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/action/all`,{headers});
  }

  public getActionById(id) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/action/${id}`,{headers} );
  }
  public createAction(action: Action){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.post(environment.baseUrl +`/action/create`, action,{headers} );
  }
  public updateAction(id, action) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.put(environment.baseUrl +`/action/edit/`+ id, action,{headers} );
  }
  public deleteAction(id){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.delete(environment.baseUrl +`/action/delete/${id}`,{headers} );
  }

}
