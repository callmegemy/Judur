import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubAdminComponent } from './view-sub-admin.component';

describe('ViewSubAdminComponent', () => {
  let component: ViewSubAdminComponent;
  let fixture: ComponentFixture<ViewSubAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSubAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSubAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
