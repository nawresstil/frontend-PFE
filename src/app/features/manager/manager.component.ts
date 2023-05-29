import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {UserService} from "./services/user.service";
import {Users} from "../../models/users";
import {Society} from "../../models/society";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {RegisterRequest} from "../../models/registerRequest";
import {AuthenticationResponse} from "../../models/authenticationResponse";

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
  public updateUser: Users;
  private deleteUser: Users;
  public errorMessage: string;
  addForm: FormGroup;

  editForm: FormGroup;
  currentDate :string;
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

      JoiningDate: this.currentDate.substring(0, 10),

      Designation: ['', Validators.required],

      Departments: ['', Validators.required],

      username: ['', Validators.required],

      email: ['', Validators.required],

      password: ['', Validators.required],

      confirmPassword: ['', Validators.required],

      phone: ['', Validators.required],

      oldPassword: ['', Validators.required],

      role: ['', Validators.required],



    });
  }

  getUsers(){
    this.userService.getUsers().subscribe((response: Users[]) => {
      this.user = response;
    },(err) => {
      console.log('error while getting users ', err);
    });
  }
  add() {
    console.log(this.addForm);
    if (this.addForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log('***********************************');
    this.userService.registerUser(this.addForm.value).subscribe(res => {
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
  // add() {
  //   if (this.addForm.valid) {
  //     this.openModal = false;
  //     this.submitted = false;
  //     const registerRequest: RegisterRequest = {
  //       firstname: this.addForm.value.firstname,
  //       lastname: this.addForm.value.lastname,
  //       joiningDate: this.addForm.value.JoiningDate,
  //       // designation: this.addForm.value.Designation,
  //       Departments: this.addForm.value.Departments,
  //       username: this.addForm.value.username,
  //       email: this.addForm.value.email,
  //       password: this.addForm.value.password,
  //       confirmPassword: this.addForm.value.confirmPassword,
  //       phone: this.addForm.value.phone,
  //       role: this.addForm.value.role
  //     };
  //
  //     this.userService.registerUser(registerRequest).subscribe(
  //       (res: AuthenticationResponse) => {
  //         this.getUsers();
  //         Swal.fire({
  //           position: 'center',
  //           title: 'Added Successfully',
  //           html: 'Trial quote has been added',
  //           icon: 'success',
  //           showConfirmButton: false,
  //           timer: 1500,
  //           width: 500,
  //         });
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.log('error while adding user ', error);
  //       }
  //     );
  //   } else {
  //     this.submitted = false;
  //   }
  //   this.router.navigate(['/home/features/manager']);
  // }
  getConnectedUser(){
    this.userService.getConnectedUser().subscribe(
      (response: Users) => {
        this.userC = response;
        console.log(this.userC);
      }, (err) => {
        console.log('error while getting clients ', err);
      });
  }
  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      response => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
      this.updateUser = user;
      // this.initForm();
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
