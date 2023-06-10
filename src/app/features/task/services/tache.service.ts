import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../../../login/services/authentification.service";
import {environment} from "../../../../environments/environment";
import {TacheS} from "../../../models/tasks/tache";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getAllTaches(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/tacheSoc/all`,{headers});
  }

  public getTacheSById(id) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/tacheSoc/${id}`,{headers} );
  }
  public createTacheS(tacheS: TacheS){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.post(environment.baseUrl +`/tacheSoc/add`, tacheS,{headers} );
  }
  public updateTacheS(id, tacheS) {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.put(environment.baseUrl +`/tacheSoc/update/`+ id, tacheS,{headers});
  }

  public deleteTacheS(id){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.delete(environment.baseUrl +`/tacheSoc/delete/${id}`,{headers} );
  }

  getTasksDone(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/tasks-done/all`,{headers} );
  }

  getTasksTodoToday(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});

    return this.http.get(environment.baseUrl +`/tasks-todo-today/all`,{headers} );
  }
  getTasksDelayed(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/tasks-delayed/all`,{headers} );
  }

  // getProspects(): Observable<Prospect[]> {
  //   return this.http.get<Prospect[]>(`${this.url}/prospect/all`);
  // }

  getTasksToDoAfterToday(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.loadToken()});
    return this.http.get(environment.baseUrl +`/task-todo-after/all`,{headers});
  }
}
