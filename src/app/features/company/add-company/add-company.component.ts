import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Society} from "../../../models/society";
import {HttpErrorResponse} from "@angular/common/http";
import {CompanyService} from "../services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../login/services/authentification.service";

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
  listProspect;
  role;
  user;
  userFile;
  imgURL: any;
  p = 1; // Current page number
  today: string;
  currentDate :string;
  addProspect: FormGroup;
  constructor(private companyService: CompanyService,private formBuilder: FormBuilder, private actvroute: ActivatedRoute,
              private router: Router, private authService: AuthenticationService)
  {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }
  ngOnInit(): void {

      this.getprofileadmine();
      // this.initForm() ;
    this.addProspect = this.formBuilder.group({
      tracability: this.user,
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
  get f() {
    return this.addProspect.controls;
  }
  ngSubmit() {
    this.submitted = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addProspect.value, null, 4));
  }
  add() {
    this.addProspect.patchValue({
      // tracability: this.user.lastname + ' ' + this.user.firstName
       });
    this.companyService.addSociety(this.addProspect.value).subscribe(res => {
      this.getallProspect();
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
  getallProspect() {
    this.companyService.getCompany().subscribe(result => {
      this.listProspect = result;
    });
  }
  getprofileadmine() {
    this.authService.getprofile().subscribe(res => {
      console.log(res);
      this.user = res;
      this.role = res['roles'][0]['roleName'];

    });
  }
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
      emailSociety: new FormControl ( '', [Validators.required]),
      lastName: new FormControl ( '', [Validators.required]),
      firstName: new FormControl ( '', [Validators.required]),
      email: new FormControl ( '', [Validators.required]),
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

  // public onAddSociety(addForm: FormGroup): void {
  //   console.log(this.addForm);
  //   // const society1: Society = {
  //   //   societyName: addForm.value.societyName,
  //   //   siteWeb: addForm.value.siteWeb,
  //   //   // Add other fields as needed
  //   //   imageUrl: addForm.value.imageUrl // Assuming your form control name for the image is 'image'
  //   // };
  //   if (this.addForm.valid) {
  //     console.log('***********************************');
  //     this.companyService.addSociety(addForm.value).subscribe(
  //       (response: Society[]) => {
  //         console.log(response);
  //         // addForm.reset();
  //         Swal.fire({
  //           position: 'center',
  //           title: 'Added Successfully',
  //           html: 'Customer has been added',
  //           icon: 'success',
  //           showConfirmButton: false,
  //           timer: 1500,
  //           width: 500,
  //         });
  //       },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message);
  //         addForm.reset();
  //       }
  //     );
  //   } else {
  //     this.submitted = false;
  //   }
  //   // this.router.navigate(['/Entreprise']);
  // }
}
