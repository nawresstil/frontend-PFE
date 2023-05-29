import { Component, OnInit } from '@angular/core';
import {Society} from "../../models/society";
import {Project} from "../../models/Project";
import {CompanyService} from "../company/services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ProspectService} from "../client/services/prospect.service";
import {ProjectService} from "./services/project.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public project: Project[];

  constructor(private projectService: ProjectService, private actvroute: ActivatedRoute,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getProject();
  }
  getProject(){
    this.projectService.getproject().subscribe((response: Project[]) => {
      this.project = response;
    },(err) => {
      console.log('error while getting clients ', err);
    });
  }
  public onDeleteProject(projectId){
    Swal.fire({
      position: 'center',
      title: 'Are you sure?',
      html: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      width: 500,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.projectService.deleteProject(projectId).subscribe(
          () => {
            console.log('Society deleted');
            this.getProject();
            Swal.fire(
              'Deleted!',
              'Your Society has been deleted.',
              'success'
            );
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }
}
