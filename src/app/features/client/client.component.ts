import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../company/services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ClientService} from "./services/client.service";
import {Client} from "../../models/client";
import Swal from "sweetalert2";
import {Society} from "../../models/society";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  editClient;
  idClient;
  public client: Client[];
  p: 2;
  constructor(private clientService: ClientService, private actvroute: ActivatedRoute, private companyService: CompanyService,
              private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.getallClient();
  }
  getallClient() {
    this.clientService.getClients().subscribe((response: Society[]) => {
      this.client = response ;
    }, (err) => {
      console.log('error while getting clients ', err);
    });
  }
  recuper(id,societyname, siteweb,phonesociety,faxsociety,
          emailsociety,nbremployee,creationdate,Priority,typesociety,firstname,lastname,fonction,Email,Phone,Social,Status) {
    this.idClient = id;
    this.editClient.get('societyName').setValue(societyname);
    this.editClient.get('siteWeb').setValue(siteweb);
    this.editClient.get('phoneSociety').setValue(phonesociety);
    this.editClient.get('faxSociety').setValue(faxsociety);
    this.editClient.get('emailSociety').setValue(emailsociety);
    this.editClient.get('nbrEmployee').setValue(nbremployee);
    this.editClient.get('priority').setValue(Priority);
    this.editClient.get('firstName').setValue(firstname);
    this.editClient.get('lastName').setValue(lastname);
    this.editClient.get('function').setValue(fonction);
    this.editClient.get('email').setValue(Email);
    this.editClient.get('phone').setValue(Phone);
    this.editClient.get('social').setValue(Social);
    this.editClient.get('status').setValue(Status);
  }

  public updateClient(societyId: number, society: Society): void {
    this.companyService.updateSociety(societyId, society).subscribe(
      (response: Society) => {
        console.log(response);
        this.getallClient();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      width: 500,
      padding: 50,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: 'success',
      title: 'The changes saved'
    });
  }
  public searchClients(keyC: string): void {
    const result: Client[] = [];
    for (const client of this.client) {
      if (client.societyName.toLowerCase().indexOf(keyC.toLowerCase()) !== -1
        || client.emailSociety.toLowerCase().indexOf(keyC.toLowerCase()) !== -1
        || client.siteWeb.toLowerCase().indexOf(keyC.toLowerCase()) !== -1) {
        result.push(client);
      }
    }
    this.client = result;
    if (result.length === 0 || !keyC) {
      this.getallClient();
    }
  }
}
