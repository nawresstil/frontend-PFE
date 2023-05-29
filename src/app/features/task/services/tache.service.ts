import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../../../login/services/authentification.service";
import {environment} from "../../../../environments/environment";
import {TacheS} from "../../../models/tasks/tache";
import {TasksDone} from "../../../models/tasks/tasksDone";
import {TasksToday} from "../../../models/tasks/tasksToday";
import {TasksDelayed} from "../../../models/tasks/tasksDelayed";

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public getAllTaches(){
    return this.http.get(environment.baseUrl +`/tacheSoc/all`);
  }

  public getTacheSById(id) {
    return this.http.get(environment.baseUrl +`/tacheSoc/${id}`);
  }
  public createTacheS(tacheS: TacheS){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.post(environment.baseUrl +`/tacheSoc/add`, tacheS,{headers} );
  }
  public updateTacheS(id: number, tacheS: TacheS): Observable<TacheS> {
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.put<TacheS>(environment.baseUrl +`/tacheSoc/update/${id}`, tacheS,{headers} );
  }

  public deleteTacheS(id){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.delete(environment.baseUrl +`/tacheSoc/delete/${id}`,{headers} );
  }

  getTasksDone(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/tasks-done/all`,{headers} );
  }

  getTasksTodoToday(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});

    return this.http.get(environment.baseUrl +`/tasks-todo-today/all`,{headers} );
  }
  getTasksDelayed(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/tasks-delayed/all`,{headers} );
  }

  // getProspects(): Observable<Prospect[]> {
  //   return this.http.get<Prospect[]>(`${this.url}/prospect/all`);
  // }

  getTasksToDoAfterToday(){
    const headers = new HttpHeaders({Authorization: 'Bearer ' + this.authService.jwt});
    return this.http.get(environment.baseUrl +`/task-todo-after/all`,{headers});
  }
}
