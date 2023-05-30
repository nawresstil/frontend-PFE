import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../../login/services/authentification.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  getproject() {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/project/all`,{headers} );
  }
  addProject(project) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post(environment.baseUrl +`/project/add`, project, {headers} );
  }
  public updateProject(projectId , project){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.put(environment.baseUrl +`/project/update/`+ projectId, project, {headers} );
  }
  public deleteProject(projectId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.delete(environment.baseUrl +`/project/delete/` + projectId,{headers});
  }
  public getprojectById(projectId){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/project/` + projectId,{headers});
  }
}
