import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TacheService} from "./services/tache.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {ClientService} from "../client/services/client.service";
import {ProspectService} from "../client/services/prospect.service";
import {TacheS} from "../../models/tasks/tache";
import {Client} from "../../models/client";
import {Prospect} from "../../models/prospect";
import {Users} from "../../models/users";
import {UserService} from "../manager/services/user.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public tacheS: TacheS[];
  public client: Client[];
  public prospects: Prospect[];
  public users: Users[];

  public tache: TacheS;
  openModal = false;
  submitted = false;

  listProspect;
  listClients;
  tasksDelayed;
  taskDone;
  taskfortoday;
  taskTodo;
  public updateTacheS: TacheS;
  isFormVisible = true;
  isFormVisible1 = false;
  isFormVisible2 = false;
  isFormVisible3 = false;
  isFormVisible4 = false;
  addForm: FormGroup;
  p = 1; // Current page number
  editForm: FormGroup;

  constructor(private tacheService: TacheService, private actvroute: ActivatedRoute,
              private formBuilder: FormBuilder, private router: Router,
              private prospectService: ProspectService,
              private clientService: ClientService,
              private userService: UserService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      selectedSo: new FormControl (''),
      contact: new FormControl (''),
      date: new FormControl (''),
      description: new FormControl (''),
      titre: new FormControl (''),
      label: new FormControl (''),
      times: new FormControl (''),
      collaborateurs: new FormControl ('')
    });
    this.getProspects();
    this.getClients();
    this.getUsers();
    this.getAllTaches();
    this.getTasksDone();
    this.getTasksTodoToday();
    this.getTasksDelayed();
    this.getTasksToDoAfterToday();
  }
  initForm() {
    this.editForm = new FormGroup({
      selectedSocEdit: new FormControl (''),
      contact: new FormControl (this.updateTacheS.contact ),
      date: new FormControl (this.updateTacheS.date),
      description: new FormControl (this.updateTacheS.description),
      titre: new FormControl (this.updateTacheS.titre),
      label: new FormControl (this.updateTacheS.label),
      times: new FormControl (this.updateTacheS.times),
      collaborateurs: new FormControl (this.updateTacheS.collaborateurs),
      etat: new FormControl (this.updateTacheS.collaborateurs)
    });
  }
  getProspects() {
    this.prospectService.getProspect().subscribe(
      (response: Prospect[]) => {
        this.prospects = response;
      }, (err) => {
      console.log('error while getting clients ', err);
    });
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: Users[]) => {
        this.users = response;
      },
      (err) => {
        console.log('error while getting users ', err);
      });
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.client = response;
      }, (err) => {
      console.log('error while getting clients ', err);
    });
  }

  add() {
    console.log(this.addForm);
    if (this.addForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log('***********************************');
    this.tacheService.createTacheS(this.addForm.value).subscribe(res => {
      this.getAllTaches();
      Swal.fire({
        position: 'center',
        title: 'Added Successfully',
        html: 'Trial quote has been added',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        width: 500,
      });
    });
    } else {
      this.submitted = false;
    }
    this.router.navigate(['/home/features/task']);
  }
  public onUpdateTache(id: number, task:TacheS): void {
    if (this.editForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log('***********************************');
    this.tacheService.updateTacheS(id,task).subscribe(
      (response: TacheS) => {
        console.log(response);
        this.getAllTaches();
        Toast.fire({
          icon: 'success',
          title: 'The changes saved'
        });
        this.getAllTaches();
      }
    );const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        width: 500,
        padding: 50,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'The changes saved'
      });
    }else {
      this.submitted = false;
    }
    this.router.navigate(['/home/features/task']);
  }
  private getAllTaches(): void {
    this.tacheService.getAllTaches().subscribe(
      (response: TacheS[]) => {
        this.tacheS = response;
      });
  }
  private getTasksDone(): void {
    this.tacheService.getTasksDone().subscribe(result => {
      this.taskDone= result ;
    }, (err) => {
      console.log('error while getting clients ', err);
    });
  }
  private getTasksTodoToday(): void {
    this.tacheService.getTasksTodoToday().subscribe(result => {
      this.taskfortoday = result ;
    }, (err) => {
      console.log('error while getting clients ', err);
    });
  }
  private getTasksToDoAfterToday(): void {
    this.tacheService.getTasksToDoAfterToday().subscribe(result => {
      this.taskTodo = result ;
    }, (err) => {
      console.log('error while getting clients ', err);
    });
  }
  private getTasksDelayed(): void {
    this.tacheService.getTasksDelayed().subscribe(result => {
      this.tasksDelayed = result ;
    }, (err) => {
      console.log('error while getting clients ', err);
    });
  }


  public onDeleteTache(tacheId){
    Swal.fire({
      position: 'center',
      title: 'Are you sure?',
      html: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      width: 500,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.tacheService.deleteTacheS(tacheId).subscribe(
          () => {
            console.log('Society deleted');
            this.getAllTaches();
            Swal.fire(
              'Deleted!',
              'Your Society has been deleted.',
              'success'
            );
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }


  public searchTask(key: string): void {
    const result: TacheS[] = [];
    for (const tacheS of this.tacheS) {
      if (tacheS.titre.toLowerCase().indexOf(key.toLowerCase()) !== -1
        // || tacheS.collaborateurs.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || tacheS.label.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        result.push(tacheS);
      }
    }
    this.tacheS = result;
    if (result.length === 0 || !key) {
      this.getAllTaches();
    }
  }
  public onOpenModal(tacheS: TacheS, mode: string): void {
    this.openModal = true;
    this.submitted = false;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTacheSModal');
    }

    if (mode === 'update') {
      this.updateTacheS = tacheS;
      this.initForm();
      button.setAttribute('data-target', '#updateTacheSModal');
    }
    if (mode === 'viewDetails') {
      this.updateTacheS = tacheS;
      button.setAttribute('data-target', '#viewDetailsModal');
    }
    container.appendChild(button);
    button.click();
  }

  toggleFormVisibility() {
    this.isFormVisible = false;
    this.isFormVisible1 = true;
    this.isFormVisible2 = false;
    this.isFormVisible3 = false;
    this.isFormVisible4 = false;
  }
  toggleFormVisibility1() {
    this.isFormVisible = true;
    this.isFormVisible1 = false;
    this.isFormVisible2 = false;
    this.isFormVisible3 = false;
    this.isFormVisible4 = false;

  }
  toggleFormVisibility2() {
    this.isFormVisible = false;
    this.isFormVisible1 = false;
    this.isFormVisible2 = true;
    this.isFormVisible3 = false;
    this.isFormVisible4 = false;
  }
  toggleFormVisibility3() {
    this.isFormVisible = false;
    this.isFormVisible1 = false;
    this.isFormVisible2 = false;
    this.isFormVisible3 = true;
    this.isFormVisible4 = false;
  }
  toggleFormVisibility4() {
    this.isFormVisible = false;
    this.isFormVisible1 = false;
    this.isFormVisible2 = false;
    this.isFormVisible3 = false;
    this.isFormVisible4 = true;
  }
}
