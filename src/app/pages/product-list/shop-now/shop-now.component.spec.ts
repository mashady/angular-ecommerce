import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNowComponent } from './shop-now.component';

describe('ShopNowComponent', () => {
  let component: ShopNowComponent;
  let fixture: ComponentFixture<ShopNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopNowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
