import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/product-list/side-bar/side-bar.component.spec.ts
import { SideBarComponent } from './side-bar.component';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
========
import { NewAddressComponent } from './new-address.component';

describe('NewAddressComponent', () => {
  let component: NewAddressComponent;
  let fixture: ComponentFixture<NewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAddressComponent);
>>>>>>>> cbf4d539675e0aa57cf095b461ebae243f42fb3f:src/app/pages/account/new-address/new-address.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
