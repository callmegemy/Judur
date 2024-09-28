import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonerProfileComponent } from './doner-profile.component';

describe('DonerProfileComponent', () => {
  let component: DonerProfileComponent;
  let fixture: ComponentFixture<DonerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
