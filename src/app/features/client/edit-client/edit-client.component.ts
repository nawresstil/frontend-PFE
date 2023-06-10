import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Users} from "../../../models/users";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../../company/services/company.service";
import {AuthenticationService} from "../../../login/services/authentification.service";
import {UserService} from "../../manager/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  DetailsCompany;
  idCompany;
  submitted = false;
  listCompany;
  editCompany: FormGroup;
  today;
  currentDate;
  public userC: Users;
  constructor(private actvroute: ActivatedRoute,
              private companyService: CompanyService,
              private formBuilder: FormBuilder ,
              private router: Router , private authService: AuthenticationService, private userService:UserService) {
    this.idCompany = this.actvroute.params['value']['idCompany'];

    this.companyService.getById(this.idCompany).subscribe(result => {
      this.DetailsCompany = result;
    });
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }
  //
  ngOnInit() {
    this.getConnected();
    this.init();
    this.getallCompany();
    // this.today = new Date().toISOString().split('T')[0];
    // this.editCompany.get('creationDate').setValue(this.today);

  }
  init(){
    this.editCompany = this.formBuilder.group({
      tracability: this.userC,
      societyName: ['', [Validators.required]],
      siteWeb: ['', Validators.required],
      phoneSociety: ['', Validators.required],

      faxSociety: ['', Validators.required],

      emailSociety: ['', Validators.required],

      pays: ['', Validators.required],

      sector: ['', Validators.required],

      nbrEmployee: ['', Validators.required],

      creationDate: this.currentDate.substring(0, 10),

      priority: ['', Validators.required],

      typeSociety: ['', Validators.required],

      gender: ['', Validators.required],

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      function: ['', Validators.required],

      email: ['', Validators.required],

      phone: ['', Validators.required],


      social: ['', Validators.required],


      status: ['', Validators.required],
    });
  }
  get f() {
    return this.editCompany.controls;
  }
  onSubmit() {
    this.submitted = true;

    console.log('addform', this.editCompany.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editCompany.value, null, 4));
  }
  getConnected(){
    this.userService.getConnectedUser().subscribe(
      (response: Users) => {
        this.userC= response;
      });
  }
  edit() {
    this.editCompany.patchValue({
      trac: this.userC.lastname + ' ' + this.userC.username});
    this.companyService.updateSociety(this.idCompany, this.editCompany.value).subscribe(res => {
      console.log(res);
      // this.getallCompany();
    });
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
    this.router.navigate(['/home/features/prospect']);
  }
  getallCompany() {
    this.companyService.getCompany().subscribe(result => {
      this.listCompany = result ;
    }, (err) => {
      console.log('error while getting clients ', err);
    });
  }
}
