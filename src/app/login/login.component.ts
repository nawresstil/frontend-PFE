import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {AuthenticationService} from './services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submit = false;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }


  onLogin() {
    this.submit = true;
    this.authService.login(this.loginForm.value).subscribe(rep => {
      const jwt = rep.body.token;
      console.log(rep);
      if (jwt) {
        this.authService.saveToken(jwt);
      }
      this.router.navigateByUrl('/home');
    }, error1 => {
      Swal.fire('Error ! ' , 'Check your data ! ');
    });
  }
}
