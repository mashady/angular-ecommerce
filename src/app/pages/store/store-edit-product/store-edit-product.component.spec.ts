import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditProductComponent } from './store-edit-product.component';

describe('StoreEditProductComponent', () => {
  let component: StoreEditProductComponent;
  let fixture: ComponentFixture<StoreEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreEditProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
