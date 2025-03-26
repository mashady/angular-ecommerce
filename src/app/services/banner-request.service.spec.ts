import { TestBed } from '@angular/core/testing';

import { BannerRequestService } from './banner-request.service';

describe('BannerRequestService', () => {
  let service: BannerRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
