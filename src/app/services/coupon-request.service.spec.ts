import { TestBed } from '@angular/core/testing';

import { CouponRequestService } from './coupon-request.service';

describe('CouponRequestService', () => {
  let service: CouponRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
