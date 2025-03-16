import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSection1Component } from './main-section-1.component';

describe('MainSection1Component', () => {
  let component: MainSection1Component;
  let fixture: ComponentFixture<MainSection1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSection1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
