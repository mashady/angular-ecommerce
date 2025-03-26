import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannersComponent } from './admin-banners.component';

describe('AdminBannersComponent', () => {
  let component: AdminBannersComponent;
  let fixture: ComponentFixture<AdminBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBannersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
