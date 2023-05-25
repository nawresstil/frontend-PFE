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
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/entreprise/all`, {headers});
  }
  addSociety(society) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post(environment.baseUrl +`/entreprise/create`, society, {headers});
  }
  public updateSociety(societyId: number, society: Society): Observable<Society> {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.put<Society>(environment.baseUrl +`/entreprise/update/${societyId}`, society);
  }
}
