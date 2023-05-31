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

      phone: new FormControl ( '', [this.phoneCustomValidator, Validators.required]),

      social: ['', Validators.required],


      status: ['', Validators.required],
    });

  }

  get f() {
    return this.addProspect.controls;
  }
  ngSubmit() {
    this.submitted = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addProspect.value, null, 4));
  }
  add() {
    this.addProspect.patchValue({
      tracability: this.userC.lastname + ' ' + this.userC.firstname
       });
    this.companyService.addSociety(this.addProspect.value).subscribe(res => {
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
  // getprofileadmine() {
  //   this.authService.getprofile().subscribe(res => {
  //     console.log(res);
  //     this.user = res;
  //     this.role = res['roles'][0]['roleName'];
  //
  //   });
  // }
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      const mimeType: string = file.type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }
      const reader: FileReader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgURL = reader.result as string;
      };
    }
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

  initForm() {
    this.addForm = new FormGroup({
      societyName: new FormControl ( '', [Validators.required]),
      siteWeb: new FormControl ( '', [Validators.required]),
      phoneSociety: new FormControl (  '', [this.phoneCustomValidator, Validators.required]),
      faxSociety: new FormControl ( '', [this.phoneCustomValidator, Validators.required]),
      emailSociety: new FormControl ( '', [Validators.required,this.emailValidator]),
      lastName: new FormControl ( '', [Validators.required]),
      firstName: new FormControl ( '', [Validators.required]),
      email: new FormControl ( '', [Validators.required,this.emailValidator ]),
      phone: new FormControl ( '', [this.phoneCustomValidator, Validators.required]),
      function: new FormControl ( '', [Validators.required]),
      status: new FormControl ( '', [Validators.required]),
      sector: new FormControl (''),
      creationDate: new FormControl( this.today),
      nbrEmployee:  new FormControl (''),
      typeSociety:  new FormControl (''),
      social:  new FormControl (''),
      priority:  new FormControl (''),
      file:  new FormControl ('')
    });
  }
  emailValidator(control) {
// tslint:disable
    const re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// RFC 2822 compliant regex
    if (control.value != null && re.test(control.value)) {
      return null;
    } else {
      if (!control.value) {
        return null;
      } else {
        return {'invalidEmailAddress': true};
      }
    }
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
