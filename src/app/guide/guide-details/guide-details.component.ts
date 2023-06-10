import { Component, OnInit } from '@angular/core';
import {Prospect} from "../../models/prospect";
import {Guide} from "../../models/guide";
import {ProspectService} from "../../features/client/services/prospect.service";
import {GuideService} from "../service/guide.service";
import {ActivatedRoute} from "@angular/router";
import {Society} from "../../models/society";

@Component({
  selector: 'app-guide-details',
  templateUrl: './guide-details.component.html',
  styleUrls: ['./guide-details.component.scss']
})
export class GuideDetailsComponent implements OnInit {
  public guide: Guide;
  constructor(private guideService: GuideService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.getGuideById(params.id));
  }
  getGuideById(id: number) {
    this.guideService.getGuideById(id).subscribe((data: Guide) => this.guide = data);
  }
}
