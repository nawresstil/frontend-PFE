import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../../login/services/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getGuide() {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/guide/all`,{headers} );
  }
  addGuide(project) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post(environment.baseUrl +`/guide/create`, project, {headers} );
  }
  public updateGuide(projectId , project){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.put(environment.baseUrl +`/guide/edit/`+ projectId, project, {headers} );
  }
  public deleteGuide(guideId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.delete(environment.baseUrl +`/guide/delete/` + guideId,{headers});
  }
}
