import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideDetailsComponent } from './guide-details.component';

describe('GuideDetailsComponent', () => {
  let component: GuideDetailsComponent;
  let fixture: ComponentFixture<GuideDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
