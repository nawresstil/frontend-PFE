import {Injectable} from "@angular/core";

import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../../../login/services/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getCompany() {
    const headers = new HttpHeaders({Authorization: 'Bearer ' +  this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/entreprise/all`, {headers} );
  }
  getProjectBySocietyName(entrepriseName) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/entreprise/entreprises/projects/`+ entrepriseName, {headers} );
  }
  addSociety(society) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.post(environment.baseUrl +`/entreprise/create`, society, {headers} );
  }
  public updateSociety(societyId , society){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.put(environment.baseUrl +`/entreprise/edit/`+ societyId, society, {headers} );
  }
  public deleteSociety(societyId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.delete(environment.baseUrl +`/entreprise/delete/` + societyId,{headers});
  }
  public getById(societyId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/entreprise/`+societyId,{headers});
  }
}
