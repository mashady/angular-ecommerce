import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBannersComponent } from './show-banners.component';

describe('ShowBannersComponent', () => {
  let component: ShowBannersComponent;
  let fixture: ComponentFixture<ShowBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBannersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
