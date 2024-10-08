import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableLandsComponent } from './available-lands.component';

describe('AvailableLandsComponent', () => {
  let component: AvailableLandsComponent;
  let fixture: ComponentFixture<AvailableLandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableLandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableLandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
