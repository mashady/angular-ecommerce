import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNewProductComponent } from './store-new-product.component';

describe('StoreNewProductComponent', () => {
  let component: StoreNewProductComponent;
  let fixture: ComponentFixture<StoreNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreNewProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
