import { Component, OnInit } from '@angular/core';
import {Society} from "../../models/society";
import {Project} from "../../models/Project";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProjectService} from "./services/project.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {CompanyService} from "../company/services/company.service";
import {TacheS} from "../../models/tasks/tache";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public project: Project[];
  public society: Society[];
  public society1: Society[] = [];
  public updateProject: Project;
  addForm: FormGroup;
  editForm: FormGroup;
  openModal = false;
  submitted = false;
  projectId;

  constructor(private projectService: ProjectService, private actvroute: ActivatedRoute,
              private formBuilder: FormBuilder,private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      name: new FormControl (''),
      societName: new FormControl (''),
      nbrEmployee: new FormControl (''),
      date_debut: new FormControl (''),
      date_fin: new FormControl (''),
      budget: new FormControl (''),
    });
    this.getProject();
    this.getallCompany();
  }
  initForm() {
    this.editForm = new FormGroup({
      name: new FormControl (this.updateProject.name),
      societName: new FormControl (this.updateProject.societName),
      nbrEmployee: new FormControl (this.updateProject.nbrEmployee),
      date_debut: new FormControl (this.updateProject.date_debut),
      date_fin: new FormControl (this.updateProject.date_fin),
      budget: new FormControl (this.updateProject.budget),
    });
  }
  getProject(){
    this.projectService.getproject().subscribe((response: Project[]) => {
      this.project = response;
    },(err) => {
      console.log('error while getting clients ', err);
    });
  }
  getallCompany(){
    this.companyService.getCompany().subscribe((response: Society[]) => {
      this.society = response;
    },(err) => {
      console.log('error while getting clients ', err);
    });
  }
  searchProjectByName(entrepriseName){
    this.companyService.getProjectBySocietyName(entrepriseName).subscribe((response: Project[]) => {
      this.project = response;
    },(err) => {
      console.log('error while getting projects ', err);
    });
  }
  add() {
    console.log(this.addForm);
    if (this.addForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log('***********************************');
      this.projectService.addProject(this.addForm.value).subscribe(res => {
        this.getProject();
        Swal.fire({
          position: 'center',
          title: 'Added Successfully',
          html: 'Trial quote has been added',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          width: 500,
        });
      });
    } else {
      this.submitted = false;
    }
    this.router.navigate(['/home/features/project']);
  }

  public onUpdateProject(projectId: number, project: Project): void {
    if (this.addForm.valid) {
      this.openModal = false;
      this.submitted = false;
      this.projectService.updateProject(projectId, project).subscribe(
        (response: Society) => {
          console.log(response);
          this.getProject();
          Toast.fire({
            icon: 'success',
            title: 'The changes saved'
          });
          this.getProject();
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
    }else {
        this.submitted = false;
      }
    this.router.navigate(['/home/features/project']);
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
            console.log('Project deleted');
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
  public searchProject(keys: string): void {
    const result: string[] = [];
    for (const society of this.society1) {
      const projects = society.projets;
      for (const project of projects) {
        if (project.name.toLowerCase().indexOf(keys.toLowerCase()) !== -1) {
          result.push(society.societyName);
          break;
        }
      }
      if (result.length === 0) {
        console.log('No entreprises found.');
      } else {
        console.log('Entreprises related to the project name:');
        for (const entrepriseName of result) {
          console.log(entrepriseName);
        }
      }
      console.log(result);
    }
  }

  public onOpenModal(project: Project, mode: string): void {
    this.openModal = true;
    this.submitted = false;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProjectModal');
    }

    if (mode === 'update') {
      this.updateProject = project;
      this.initForm();
      button.setAttribute('data-target', '#updateProjectModal');
    }
    container.appendChild(button);
    button.click();
  }
}
