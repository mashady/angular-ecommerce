import { TestBed } from '@angular/core/testing';

import { CategoryRequestService } from './category-request.service';

describe('CategoryRequestService', () => {
  let service: CategoryRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
