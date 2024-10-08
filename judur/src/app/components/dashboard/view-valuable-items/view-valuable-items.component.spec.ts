import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewValuableItemsComponent } from './view-valuable-items.component';

describe('ViewValuableItemsComponent', () => {
  let component: ViewValuableItemsComponent;
  let fixture: ComponentFixture<ViewValuableItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewValuableItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewValuableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
