import { Component, OnInit } from '@angular/core';
import {TacheS} from "../../models/tasks/tache";
import {Action} from "../../models/action";
import {Users} from "../../models/users";
import {ActionsService} from "./services/actions.service";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserService} from "../manager/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  public actions: Action[];
  addForm: FormGroup;
  editForm: FormGroup;
  public updateAction: Action;
  public deleteAction: Action;
  currentDate :string;
  openModal = false;
  submitted = false;
  public users: Users[];
  public userC: Users;

  constructor(private actionsService: ActionsService,
              private actvroute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.addForm = new FormGroup({

      tracability: new FormControl(this.userC),

      typeAction: new FormControl ('',[Validators.required]),

      titreAction:new FormControl ('',[Validators.required]),

      tempsDebut: new FormControl ('',[Validators.required]),

      tempFin: new FormControl (''),

      collaborateur:new FormControl ('',[Validators.required]),

      dateDebut: new FormControl ('',[Validators.required]),

      dateFin: new FormControl ('',[Validators.required]),
    });
    this.getAllActions();
    this.getUsers();
    this.getConnected();
  }
  initForm() {
    this.editForm = new FormGroup({
      tracability: new FormControl(this.userC),

      typeAction: new FormControl (this.updateAction.typeAction),

      titreAction:new FormControl (this.updateAction.titreAction),

      tempsDebut: new FormControl (this.updateAction.tempsDebut ),

      tempFin: new FormControl (this.updateAction.tempFin),

      collaborateur:new FormControl (this.updateAction.collaborateur ),

      dateDebut: new FormControl (this.updateAction.dateDebut ),

      dateFin: new FormControl (this.updateAction.dateFin ),

      etat: new FormControl (this.updateAction.etat)

    });
  }
  getAllActions(){
    this.actionsService.getAllActions().subscribe((response: Action[]) => {
      this.actions = response;
    },(err) => {
      console.log('error while getting Actions ', err);
    });
  }
  add() {
    this.addForm.patchValue({
      tracability: this.userC.lastname + ' ' + this.userC.firstname
    });
    console.log(this.addForm.valid);
    if (this.addForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log('***********************************');
      this.actionsService.createAction(this.addForm.value).subscribe(res => {
        this.getAllActions();
        Swal.fire({
          position: 'center',
          title: 'Added Successfully',
          html: 'Task has been added',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          width: 500,
        });
      });
    } else {
      this.submitted = false;
    }
    this.router.navigate(['/home/features/action']);
  }

  public onUpdateAction(id: number, action:Action): void {
    this.editForm.patchValue({
      tracability: this.userC.lastname + ' ' + this.userC.firstname
    });
    console.log(this.editForm.valid);
    if (this.editForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log('***********************************');
      this.actionsService.updateAction(id,action).subscribe(
        (response: Action) => {
          console.log(response);
          this.getAllActions();
          Toast.fire({
            icon: 'success',
            title: 'The changes saved'
          });
          this.getAllActions();
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
    this.router.navigate(['/home/features/action']);
  }
  public onDeleteAction(id){
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
        this.actionsService.deleteAction(id).subscribe(
          () => {
            console.log('Society deleted');
            this.getAllActions();
            Swal.fire(
              'Deleted!',
              'Your Task has been deleted.',
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
  public searchActions(key: string): void {
    const result: Action[] = [];
    for (const action of this.actions) {
      if (action.titreAction.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || action.dateDebut.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || action.dateFin.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || action.collaborateur.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || action.typeAction.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(action);
      }
    }
    this.actions = result;
    if (result.length === 0 || !key) {
      this.getAllActions();
    }
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
  getConnected(){
    this.userService.getConnectedUser().subscribe(
      (response: Users) => {
        this.userC= response;
      });
  }
  public onOpenModal(action: Action, mode: string): void {
    this.openModal = true;
    this.submitted = false;
    const container = document.getElementById('main-container');
    if (!container) {
      console.error('Container element not found.');
      return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addActionModal');
    }

    if (mode === 'update') {
      this.updateAction = action;
      this.initForm();
      button.setAttribute('data-target', '#updateActionModal');
    }
    if (mode === 'delete') {
      this.deleteAction = action;
      button.setAttribute('data-target', '#deleteActionModal');
    }

    container.appendChild(button);
    button.click();
  }
}
