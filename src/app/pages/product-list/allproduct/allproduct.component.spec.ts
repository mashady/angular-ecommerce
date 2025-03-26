import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllproductComponent } from './allproduct.component';

describe('AllproductComponent', () => {
  let component: AllproductComponent;
  let fixture: ComponentFixture<AllproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
