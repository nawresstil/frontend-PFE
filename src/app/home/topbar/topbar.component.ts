import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../login/services/authentification.service';
import {Users} from "../../models/users";
import {UserService} from "../../features/manager/services/user.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  public userC: Users;

  user;
  role;
  constructor(private authService: AuthenticationService ,  private router: Router,private userService: UserService,) {
// this.getprofile();
  }

  ngOnInit() {
    this.getConnectedUser();
  }
  // getprofile() {
  //   this.authService.getprofile().subscribe(res => {
  //     this.user = res;
  //     this.role = res['roles'][0]['roleName'];
  //   });
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
  deconnexion() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
