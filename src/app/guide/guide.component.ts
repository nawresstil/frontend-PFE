import { Component, OnInit } from '@angular/core';
import {Project} from "../models/Project";
import {ProjectService} from "../features/project/services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../features/company/services/company.service";
import {GuideService} from "./service/guide.service";
import {Guide} from "../models/guide";
import {Society} from "../models/society";
import Swal from "sweetalert2";
import {Client} from "../models/client";
import {HttpErrorResponse} from "@angular/common/http";
import {TacheS} from "../models/tasks/tache";
import {Users} from "../models/users";
import {UserService} from "../features/manager/services/user.service";

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  public updateGuide: Guide;
  public userC: Users;
  public guide: Guide[];
  addForm: FormGroup;
  editForm: FormGroup;
  openModal = false;
  submitted = false;
  constructor(private guideService: GuideService, private actvroute: ActivatedRoute,
              private formBuilder: FormBuilder, private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      annee: new FormControl (''),
      objectif:  ['', Validators.required],
      qualification:  ['', Validators.required],
      projectinfo: ['', Validators.required],
      problematic: ['', Validators.required],
      budget: ['', Validators.required],
    });
    this.getGuide();
    this.getConnected();
  }
  initForm() {
    this.editForm = new FormGroup({
      annee: new FormControl (this.updateGuide.annee || '', [Validators.required]),
      objectif: new FormControl (this.updateGuide.objectif || '', [Validators.required]),
      qualification: new FormControl (this.updateGuide.qualification || '', [Validators.required]),
      projectinfo: new FormControl (this.updateGuide.projectinfo || '', [Validators.required]),
      problematic: new FormControl (this.updateGuide.problematic || '', [Validators.required]),
      budget: new FormControl (this.updateGuide.budget || '', [Validators.required]),
    });
  }
  getGuide(){
    this.guideService.getGuide().subscribe((response: Guide[]) => {
      this.guide = response;
    },(err) => {
      console.log('error while getting guide ', err);
    });
  }

  getConnected(){
    this.userService.getConnectedUser().subscribe(
      (response: Users) => {
        this.userC= response;
      });
  }
  add() {
    console.log(this.addForm);
    if (this.addForm.valid) {
      this.openModal = false;
      this.submitted = false;
      console.log('***********************************');
      this.guideService.addGuide(this.addForm.value).subscribe(res => {
        this.getGuide();
        Swal.fire({
          position: 'center',
          title: 'Added Successfully',
          html: 'guide has been added',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          width: 500,
        });
      });
    } else {
      this.submitted = false;
    }
    this.router.navigate(['/home/features/prospection_guide']);
  }

  public onUpdateGuide(id: number, guide:TacheS): void {
    if (this.editForm.valid) {
      this.openModal = false;
      this.submitted = false;
      this.guideService.updateGuide(id,guide).subscribe(
        (response: TacheS) => {
          console.log(response);
          this.getGuide();
          Toast.fire({
            icon: 'success',
            title: 'The changes saved'
          });
          this.getGuide();
        }
      );const Toast = Swal.mixin({
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
    this.router.navigate(['/home/features/prospection_guide']);
  }
  public onDeleteGuide(guideId){
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
        this.guideService.deleteGuide(guideId).subscribe(
          () => {
            console.log('Project deleted');
            this.getGuide();
            Swal.fire(
              'Deleted!',
              'Your Prospection Guide has been deleted.',
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
  public searchGuide(keyC: string): void {
    const result: Guide[] = [];
    for (const guide of this.guide) {
      if (guide.annee.toLowerCase().indexOf(keyC.toLowerCase()) !== -1
       ) {
        result.push(guide);
      }
    }
    this.guide = result;
    if (result.length === 0 || !keyC) {
      this.getGuide();
    }
  }
  public onOpenModal(guide: Guide, mode: string): void {
    this.openModal = true;
    this.submitted = false;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addGuide');
    }

    if (mode === 'update') {
      this.updateGuide = guide;
      this.initForm();
      button.setAttribute('data-target', '#updateGuideModal');
    }
    container.appendChild(button);
    button.click();
  }
}
