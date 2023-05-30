import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {AuthenticationService} from './services/authentification.service';
import {UserService} from "../features/manager/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;
  submit = false;
  forgetForm: FormGroup;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onLogin() {
    this.submit = true;
    this.authService.login(this.loginForm.value).subscribe((rep : any) => {
      const jwt = rep.body.token;
      if (jwt) {
        this.authService.saveToken(jwt);
      }
      this.router.navigateByUrl('/home');
    }, error1 => {
      Swal.fire('Error ! ' , 'Check your data ! ');
    });
  }
  // resetPassword(resetForm: NgForm) {
  //   if (resetForm.valid) {
  //     const email = resetForm.value.email;
  //     this.userService.forgotPassword(email).subscribe(
  //       (response) => {
  //         // Password reset request successful, provide feedback to the user
  //       },
  //       (error) => {
  //         // Handle error and provide feedback to the user
  //       }
  //     );
  //   }
  // }
  resetPassword() {
    if (this.forgetForm.valid) {
      this.userService.forgotPassword(this.forgetForm.value).subscribe(
        (response) => {
          console.log('Password reset request successful');
        },
        (error) => {
          console.log('Password reset request not working');
        }
      );
    }
  }
}
