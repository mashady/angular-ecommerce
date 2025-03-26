import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Coupon } from '../../../interfaces/coupon';
import { CouponRequestService } from '../../../services/coupon-request.service';
@Component({
  selector: 'app-admin-coupons',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.css']
})
export class AdminCouponsComponent {
  coupons: Coupon[] = [];
  submitting = false;
  couponForm !: FormGroup;
  mode: string = 'add';
  id: string | undefined = undefined;
  constructor(private couponRequestService: CouponRequestService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.couponRequestService.getAllCoupons().subscribe({
      next: (response) => {
        this.coupons = response.Promocodes;
      },
      error: (error) => {
        console.error('Error fetching coupons:', error);
      }
    });

    this.couponForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      value: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
    });
  }

  addCoupon() {
    this.submitting = true;
    this.couponRequestService.addCoupon(this.couponForm.value).subscribe({
      next: (response) => {
        console.log('Coupon added successfully', response);
        this.couponForm.reset();
        this.submitting = false;
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error adding coupon:', error);
        this.submitting = false;
      }
    });
  }

  getCouponData(coupon: Coupon) {
    this.couponForm.patchValue({
      name: coupon.name,
      value: coupon.value
    });

    this.mode = 'edit';
    this.id = coupon._id!;
  }

  updateCoupon(id: string) {
    if(this.couponForm.invalid) {
      return;
    }
  
    this.submitting = true;
  
    this.couponRequestService.updateCoupon(id, this.couponForm.value).subscribe({
      next: (response) => {
        console.log('Coupon updated successfully', response);
        this.couponForm.reset();
        this.submitting = false;
        this.mode = 'add';
        this.id = undefined; 
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error updating coupon', error);
        this.submitting = false;
      }
    })
  }

  deleteCoupon(id: string) {
    this.submitting = true;
    this.couponRequestService.deleteCoupon(id).subscribe({
      next: (response) => {
        console.log('Coupon deleted successfully', response);
        this.submitting = false;
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error deleting coupon:', error);
        this.submitting = false;
      }
    });
  }

  resetForm() {
    this.couponForm.reset();
    this.mode = 'add';
    this.id = undefined;
  }

}
