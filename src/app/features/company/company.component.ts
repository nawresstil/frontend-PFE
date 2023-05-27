import { Component, OnInit } from '@angular/core';
import {Society} from "../../models/society";
import {HttpErrorResponse} from "@angular/common/http";
import {CompanyService} from "./services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  submitted = false;
  listCompany;
  currentDate;
  addForm: FormGroup;
  today: string;
  idCompany;
  addProspect;
  constructor(private companyService: CompanyService, private actvroute: ActivatedRoute,
              private formBuilder: FormBuilder, private router: Router) {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
    this.addProspect = this.formBuilder.group({
      // tracability: this.user,
      societyName: ['', Validators.required],
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

  ngOnInit() {
    this.getallCompany();
  }
  recuper(id,societyname, siteweb,phonesociety,faxsociety,
          emailsociety,nbremployee,creationdate,Priority,typesociety,firstname,lastname,fonction,Email,Phone,Social,Status) {
    this.idCompany = id;
    this.addProspect.get('societyName').setValue(societyname);
    this.addProspect.get('siteWeb').setValue(siteweb);
    this.addProspect.get('phoneSociety').setValue(phonesociety);
    this.addProspect.get('faxSociety').setValue(faxsociety);
    this.addProspect.get('emailSociety').setValue(emailsociety);
    this.addProspect.get('nbrEmployee').setValue(nbremployee);
    this.addProspect.get('priority').setValue(Priority);
    this.addProspect.get('firstName').setValue(firstname);
    this.addProspect.get('lastName').setValue(lastname);
    this.addProspect.get('function').setValue(fonction);
    this.addProspect.get('email').setValue(Email);
    this.addProspect.get('phone').setValue(Phone);
    this.addProspect.get('social').setValue(Social);
    this.addProspect.get('status').setValue(Status);
  }
  navigateTo(link: string) {
    this.router.navigateByUrl(link);
  }
  getallCompany() {
    this.companyService.getCompany().subscribe(result => {
      this.listCompany = result ;
    }, (err) => {
      console.log('error while getting clients ', err);
    });
  }
  phoneCustomValidator(num): any {
    if (num.pristine || !num.value) {
      return null; // No validation necessary for pristine or empty input
    }

    const PHONE_REGEXP = new RegExp(/^[0-9]{8,15}$/); // Regular expression to match exactly 8 digits
    num.markAsTouched(); // Mark the input as touched

    if (num.value.toString().length < 8 || !PHONE_REGEXP.test(num.value)) {
      return {
        invalidPhoneNumber: true // Invalid phone number
      };
    }

    return null; // Valid phone number
  }
  public onDeleteSociety(societyId){
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
        this.companyService.deleteSociety(societyId).subscribe(
          () => {
            console.log('Society deleted');
            this.getallCompany();
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
}
