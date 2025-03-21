import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressesComponent } from './edit-addresses.component';

describe('EditAddressesComponent', () => {
  let component: EditAddressesComponent;
  let fixture: ComponentFixture<EditAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAddressesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
