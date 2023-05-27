import { Component, OnInit } from '@angular/core';
import {Society} from "../../../models/society";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../login/services/authentification.service";

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  DetailsCompany;
  idCompany;
  submitted = false;
  listCompany;
  editCompany: FormGroup;
  today;
  currentDate;
  constructor(private actvroute: ActivatedRoute, private companyService: CompanyService, private formBuilder: FormBuilder ,
              private router: Router , private authService: AuthenticationService) {
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

    this.editCompany = this.formBuilder.group({
      /*   tracability: this.user,*/
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
    this.getallCompany();
    // this.today = new Date().toISOString().split('T')[0];
    // this.editCompany.get('creationDate').setValue(this.today);

  }
  get f() {
    return this.editCompany.controls;
  }
  onSubmit() {
    this.submitted = true;

    console.log('addform', this.editCompany.value);
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editCompany.value, null, 4));
  }

  edit() {
   /* this.editCompany.patchValue({
      trac: this.user.lastname + ' ' + this.user.firstName});*/
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
  //
  // edit(societyId: number, society: Society){
  //   // if (this.editForm.valid) {
  //   //   this.submitted = false;
  //   //   console.log('***********************************');
  //     this.companyService.updateSociety(societyId, society).subscribe(
  //       (response: Society) => {
  //         console.log(response);
  //         Toast.fire({
  //           icon: 'success',
  //           title: 'The changes saved'
  //         });
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message);
  //       }
  //     );
  //     const Toast = Swal.mixin({
  //       toast: true,
  //       position: 'center',
  //       width: 500,
  //       padding: 50,
  //       showConfirmButton: false,
  //       timer: 1500,
  //       timerProgressBar: true,
  //       didOpen: (toast) => {
  //         toast.addEventListener('mouseenter', Swal.stopTimer);
  //         toast.addEventListener('mouseleave', Swal.resumeTimer);
  //       }
  //     });
  //   // }else {
  //   //   this.submitted = false;
  //   // }
  //   this.router.navigate(['/home/features/prospect']);
  // }
  //
  // initForm() {
  //   this.editForm = new FormGroup({
  //     societyName: new FormControl (this.updateSociety.societyName || '', [Validators.required]),
  //     siteWeb: new FormControl (this.updateSociety.siteWeb || '', [Validators.required]),
  //     phoneSociety: new FormControl (this.updateSociety.phoneSociety || '', [this.phoneCustomValidator, Validators.required]),
  //     faxSociety: new FormControl (this.updateSociety.faxSociety || '', [this.phoneCustomValidator, Validators.required]),
  //     emailSociety: new FormControl (this.updateSociety.emailSociety || '', [Validators.required]),
  //     lastName: new FormControl (this.updateSociety.lastName || '', [Validators.required]),
  //     firstName: new FormControl (this.updateSociety.firstName || '', [Validators.required]),
  //     email: new FormControl (this.updateSociety.email || '', [Validators.required]),
  //     phone: new FormControl (this.updateSociety.phone || '', [this.phoneCustomValidator, Validators.required]),
  //     function: new FormControl (this.updateSociety.function || '', [Validators.required]),
  //     status: new FormControl (this.updateSociety.status || '', [Validators.required]),
  //     sector: new FormControl (this.updateSociety.sector),
  //     nbrEmployee:  new FormControl (this.updateSociety.nbrEmployee),
  //     typeSociety:  new FormControl (this.updateSociety.typeSociety),
  //     social:  new FormControl (this.updateSociety.social),
  //     priority:  new FormControl (this.updateSociety.priority),
  //     imageUrl:  new FormControl (this.updateSociety.imageUrl)
  //   });
  // }
  // phoneCustomValidator(num): any {
  //   if (num.pristine || !num.value) {
  //     return null; // No validation necessary for pristine or empty input
  //   }
  //
  //   const PHONE_REGEXP = new RegExp(/^[0-9]{8,15}$/); // Regular expression to match exactly 8 digits
  //   num.markAsTouched(); // Mark the input as touched
  //
  //   if (num.value.toString().length < 8 || !PHONE_REGEXP.test(num.value)) {
  //     return {
  //       invalidPhoneNumber: true // Invalid phone number
  //     };
  //   }
  //
  //   return null; // Valid phone number
  // }

}
