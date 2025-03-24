import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderDetailsComponent } from './store-order-details.component';

describe('StoreOrderDetailsComponent', () => {
  let component: StoreOrderDetailsComponent;
  let fixture: ComponentFixture<StoreOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreOrderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
