import { Component, OnInit } from '@angular/core';
import {Society} from "../../models/society";
import {CompanyService} from "../company/services/company.service";
import {ActivatedRoute} from "@angular/router";
import {CountSocieties} from "../../models/countSocieties";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public society: CountSocieties[];
  public societies: CountSocieties;
  constructor(private companyService: CompanyService, private actvroute: ActivatedRoute) { }

  ngOnInit() {
    this.getPercentage();
  }
  getPercentage(){
    this.companyService.getPercentageGroupByStatus().subscribe((response: CountSocieties[]) => {
      this.society = response;
    },(err) => {
      console.log('error while getting clients ', err);
    });
  }
}
