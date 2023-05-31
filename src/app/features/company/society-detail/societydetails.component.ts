import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Prospect} from "../../../models/prospect";
import {Society} from "../../../models/society";
import {TacheS} from "../../../models/tasks/tache";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../client/services/client.service";
import {ProspectService} from "../../client/services/prospect.service";
import {CompanyService} from "../services/company.service";

@Component({
  selector: 'app-society-detail',
  templateUrl: './societydetails.component.html',
  styleUrls: ['./societydetails.component.scss']
})
export class SocietydetailsComponent implements OnInit {
  constructor(private prospectService: ProspectService,
              private clientService: ClientService,
              private societyService: CompanyService,
              private route: ActivatedRoute) {
  }
  public tacheSo: TacheS;
  public prospect: Prospect;
  public society: Society;
  public updateProspect: Prospect;
  isFormVisible = true;
  isFormVisible1 = false;
  ngOnInit(): void {
    this.route.params.subscribe(params => this.getSocietyById(params.id));
    // this.route.params.subscribe(params => this.getTacheSById(params.id));
  }

  getSocietyById(id: number) {
    this.societyService.getById(id).subscribe((data: Society) => this.society = data);

  }

  // getTacheSById(id: number) {
  //   this.tacheService.getTacheSById(id).subscribe((data: TacheS) => this.tacheSo = data);
  // }
  // public onUpdateProspect(prospectId: number, prospect: Prospect) {
  //   this.prospectService.updateProspect(prospectId, prospect).subscribe(
  //     (response: Prospect) => {
  //       console.log(response);
  //       this.getProspectById(prospectId);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

  public onOpenModal(prospect: Prospect, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'update') {
      this.updateProspect = prospect;
      button.setAttribute('data-target', '#updateProspectModal');
    }
    container.appendChild(button);
    button.click();
  }
  toggleFormVisibility() {
    this.isFormVisible = false;
    this.isFormVisible1 = true;
  }
  toggleFormVisibility1() {
    this.isFormVisible = true;
    this.isFormVisible1 = false;
}
}
