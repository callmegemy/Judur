import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubAdminComponent } from './edit-sub-admin.component';

describe('EditSubAdminComponent', () => {
  let component: EditSubAdminComponent;
  let fixture: ComponentFixture<EditSubAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSubAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
