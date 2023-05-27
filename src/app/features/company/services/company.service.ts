import {Injectable} from "@angular/core";
import {Society} from "../../../models/society";
import {Observable} from "rxjs";
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
    return this.http.get(environment.baseUrl +`/entreprise/all`);
  }
  addSociety(society) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post(environment.baseUrl +`/entreprise/create`, society, {headers} );
  }
  public updateSociety(societyId , society){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.put(environment.baseUrl +`/entreprise/edit/`+ societyId, society, {headers} );
  }
  public deleteSociety(societyId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.delete(environment.baseUrl +`/entreprise/delete/` + societyId,{headers});
  }

  public getById(societyId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/entreprise/` + societyId,{headers});
  }
}
