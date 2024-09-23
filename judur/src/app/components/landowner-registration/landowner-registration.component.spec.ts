import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandownerRegistrationComponent } from './landowner-registration.component';

describe('LandownerRegistrationComponent', () => {
  let component: LandownerRegistrationComponent;
  let fixture: ComponentFixture<LandownerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandownerRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandownerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
