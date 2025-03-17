import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSection2Component } from './main-section-2.component';

describe('MainSection2Component', () => {
  let component: MainSection2Component;
  let fixture: ComponentFixture<MainSection2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSection2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
