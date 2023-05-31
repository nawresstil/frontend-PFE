import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../features/manager/services/user.service";
import {AuthenticationService} from "../../login/services/authentification.service";
import {Users} from "../../models/users";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public userC: Users;

  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) {}

  ngOnInit() {

    this.userService.getConnectedUser().subscribe(
      (response: Users) => {
        this.userC = response;
      });
  }

  navigateTo(link: string) {
    this.router.navigateByUrl(link);
  }

}
