import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Society} from "../../../models/society";
import {HttpErrorResponse} from "@angular/common/http";
import {CompanyService} from "../services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../login/services/authentification.service";
import {Users} from "../../../models/users";
import {UserService} from "../../manager/services/user.service";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  public imagePath;
  public message: string;
  submitted = false;
  addForm: FormGroup;
  public society: Society[];
  role;
  user;
  userFile;
  imgURL: any;
  p = 1; // Current page number
  today: string;
  currentDate :string;
  addProspect: FormGroup;
  public userC: Users;

  constructor(private companyService: CompanyService,private formBuilder: FormBuilder, private actvroute: ActivatedRoute,
              private router: Router, private authService: AuthenticationService, private userService:UserService)
  {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.getConnected();
      this.addProspect = this.formBuilder.group({
      tracability: this.userC,
      societyName: ['', [Validators.required, Validators.minLength(4)]],
      siteWeb: ['', Validators.required],
      phoneSociety: ['',[this.phoneCustomValidator, Validators.required]],

     faxSociety: ['',[this.phoneCustomValidator, Validators.required]],

      emailSociety: ['', Validators.required],

      pays: [''],

      sector: [''],

      nbrEmployee: [''],

      creationDate: this.currentDate.substring(0, 10),

      priority: [''],

      typeSociety: [''],

      gender: [''],

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      function: ['', Validators.required],

      email: ['', Validators.required],

      phone: new FormControl ( '', [this.phoneCustomValidator, Validators.required]),

      social: [''],


      status: ['', Validators.required],
    });

  }
  navigateTo(link: string) {
    this.router.navigateByUrl(link);
  }
  get f() {
    return this.addProspect.controls;
  }
  ngSubmit() {
    this.submitted = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addProspect.value, null, 4));
  }
  add(addProspect: NgForm) {
    this.addProspect.patchValue({
      tracability: this.userC.firstname
       });
    this.companyService.addSociety(addProspect.value).subscribe(res => {
      this.getallCompany();
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
    this.router.navigate(['/home/features/prospect']);

  }
  getConnected(){
    this.userService.getConnectedUser().subscribe(
      (response: Users) => {
        this.userC= response;
      });
  }
  getallCompany() {
    this.companyService.getCompany().subscribe((response: Society[]) => {
      this.society = response;
    },(err) => {
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
}
