import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietydetailsComponent } from './societydetails.component';

describe('TasksComponent', () => {
  let component: SocietydetailsComponent;
  let fixture: ComponentFixture<SocietydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
