import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  currentDate = new Date().toLocaleDateString();
  constructor() { }

  ngOnInit() {
  }

}
