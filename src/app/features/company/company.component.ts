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
  addForm: FormGroup;
  today: string;

  constructor(private companyService: CompanyService, private actvroute: ActivatedRoute,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getallCompany();
    this.addForm = this.getFormControlConfig(this.formBuilder);
    this.today = new Date().toISOString().split('T')[0];
    this.addForm.get('creationDate').setValue(this.today);
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
  getFormControlConfig = (formBuilder: FormBuilder): FormGroup => {
    return formBuilder.group({
      societyName: ['', [Validators.required]],
      siteWeb: ['', [Validators.required]],
      phoneSociety: ['', [this.phoneCustomValidator, Validators.required]],
      faxSociety: ['', [this.phoneCustomValidator, Validators.required]],
      emailSociety: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [this.phoneCustomValidator, Validators.required]],
      function: ['', [Validators.required]],
      status: ['', [Validators.required]],
      sector: [''],
      creationDate: [''],
      nbrEmployee: [''],
      typeSociety: [''],
      social: [''],
      priority: [''],
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
  public onAddSociety(addForm: NgForm): void {
    console.log(this.addForm);
    // const society1: Society = {
    //   societyName: addForm.value.societyName,
    //   siteWeb: addForm.value.siteWeb,
    //   // Add other fields as needed
    //   imageUrl: addForm.value.imageUrl // Assuming your form control name for the image is 'image'
    // };
    if (this.addForm.valid) {

      this.submitted = false;
      console.log('***********************************');
      this.companyService.addSociety(addForm.value).subscribe(
        (response: Society[]) => {
          console.log(response);
          this.getallCompany();
          // addForm.reset();
          Swal.fire({
            position: 'center',
            title: 'Added Successfully',
            html: 'Customer has been added',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            width: 500,
          });
          this.getallCompany();

        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    } else {
      this.submitted = false;
    }
    this.router.navigate(['/Entreprise']);
  }
}
