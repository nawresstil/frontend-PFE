import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserService} from "./services/user.service";
import {Users} from "../../models/users";
import {Society} from "../../models/society";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {RegisterRequest} from "../../models/registerRequest";
import {AuthenticationResponse} from "../../models/authenticationResponse";
import {Project} from "../../models/Project";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  public user: Users[];
  public userC: Users;
  openModal = false;
  submitted = false;
  private deleteUser: Users;
  public errorMessage: string;
  addForm: FormGroup;

  editForm: FormGroup;
  currentDate :string;
  public updateManager: Users;
  constructor(private userService: UserService,
              private actvroute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder
              ) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.getUsers();

    this.getConnectedUser();

    this.addForm = this.formBuilder.group({

      firstname: ['', Validators.required],

      lastname: ['', Validators.required],

      joiningDate: this.currentDate.substring(0, 10),

      departments: ['', Validators.required],

      username: ['', Validators.required],

      email: ['', Validators.required],

      password: ['', Validators.required],

      confirmPassword: ['', Validators.required],

      phone: ['', Validators.required],

      role: ['', Validators.required]
    });
  }
  initForm() {
    this.editForm = new FormGroup({
      firstname: new FormControl (this.updateManager.firstname),
      lastname: new FormControl (this.updateManager.lastname),
      Designation: new FormControl (this.updateManager.Designation),
      departments: new FormControl (this.updateManager.departments),
      username: new FormControl (this.updateManager.username),
      email: new FormControl (this.updateManager.email),
      password: new FormControl (this.updateManager.password),
      confirmPassword: new FormControl (this.updateManager.confirmPassword),
      phone: new FormControl (this.updateManager.phone),
      oldPassword: new FormControl (this.updateManager.oldPassword),
      role: new FormControl (this.updateManager.role),
      joiningDate: new FormControl(this.currentDate.substring(0, 10)),
    });
  }
  getUsers(){
    this.userService.getUsers().subscribe((response: Users[]) => {
      this.user = response;
    },(err) => {
      console.log('error while getting users ', err);
    });
  }
  add(addForm: NgForm) {
    console.log(this.addForm.valid)
    if (this.addForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log("********************");
      console.log(this.addForm);
    this.userService.registerUser(addForm.value).subscribe(res => {
      this.getUsers();
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
this.router.navigate(['/home/features/manager']);
}
  public onUpdateManager(Id: number, user: Users): void {
    if (this.editForm.valid) {
      this.openModal = false;
      this.submitted = false;
      this.userService.updateUser(Id, user).subscribe(
        (response: Users) => {
          console.log(response);
          this.getUsers();
          Toast.fire({
            icon: 'success',
            title: 'The changes saved'
          });
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      const Toast = Swal.mixin({
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
    this.router.navigate(['/home/features/manager']);
  }
  getConnectedUser(){
    this.userService.getConnectedUser().subscribe(
      (response: Users) => {
        this.userC = response;
        console.log(this.userC);
      }, (err) => {
        console.log('error while getting clients ', err);
      });
  }
  public onDeleteUser(userId){
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
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('user deleted');
        this.getUsers();
        Swal.fire(
          'Deleted!',
          'Your User has been deleted.',
          'success'
        );
      },
      (error: HttpErrorResponse) => {
        Swal.fire(
          'Not Deleted!',
          'This User has an actions or a tasks.',
          'info'
        );
      }
    );
      }
    });
  }
  public searchUsers(key: string): void {
    const result: Users[] = [];
    for (const users of this.user) {
      if (users.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || users.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || users.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || users.role.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(users);
      }
    }
    this.user = result;
    if (result.length === 0 || !key) {
      this.getUsers();
    }
  }
  public onOpenModal(user: Users, mode: string): void {
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

    if (mode === 'addUser') {
      button.setAttribute('data-target', '#addUserModal');
    }

    if (mode === 'update') {
      this.updateManager = user;
      this.initForm();
      button.setAttribute('data-target', '#updateUserModal');
    }

    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }

    container.appendChild(button);
    button.click();
  }
}
