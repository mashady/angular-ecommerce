import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateProductComponent } from './admin-update-product.component';

describe('AdminUpdateProductComponent', () => {
  let component: AdminUpdateProductComponent;
  let fixture: ComponentFixture<AdminUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
