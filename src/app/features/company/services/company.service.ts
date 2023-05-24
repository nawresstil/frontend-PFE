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
  getSocieties() {
    const headers = new HttpHeaders({authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get<Society[]>(environment.baseUrl +`/entreprise/all`, {headers});
  }
  addSociety(society: Society) {
    const headers = new HttpHeaders({authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post<Society[]>(environment.baseUrl +`/entreprise/add`, society);
  }
}
