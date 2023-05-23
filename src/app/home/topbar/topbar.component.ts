import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../login/services/authentification.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  user;
  role;
  constructor(private authService: AuthenticationService ,  private router: Router) {
/*    this.getprofile();*/
  }

  ngOnInit() {
  }
  getprofile() {
    this.authService.getprofile().subscribe(res => {
      this.user = res;
      this.role = res['roles'][0]['roleName'];
    });
  }

  deconnexion() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
