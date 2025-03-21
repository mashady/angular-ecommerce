import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-new-address',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.css',
})
export class NewAddressComponent {
  addressForm!: FormGroup;
  apiError: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
    });
  }

  get f() {
    return this.addressForm.controls;
  }

  onSubmit(): void {
    if (this.addressForm.valid && !this.isSubmitting) {
      const newAddress = this.addressForm.value;

      const cleanedAddress = { ...newAddress };
      delete cleanedAddress._id;

      this.isSubmitting = true;

      this.accountService.account$.pipe(take(1)).subscribe({
        next: (account) => {
          if (account) {
            const updatedAddresses = account.user.address.map(
              (address: any) => {
                const { _id, ...cleanedExistingAddress } = address;
                return cleanedExistingAddress;
              }
            );

            const isDuplicate = updatedAddresses.some(
              (existingAddress: any) =>
                existingAddress.address === cleanedAddress.address &&
                existingAddress.city === cleanedAddress.city &&
                existingAddress.country === cleanedAddress.country &&
                existingAddress.zip === cleanedAddress.zip
            );

            if (isDuplicate) {
              this.apiError = 'This address is already in your list.';
              this.isSubmitting = false;
              return;
            }

            updatedAddresses.push(cleanedAddress);

            this.accountService.addAddress(cleanedAddress).subscribe({
              next: () => {
                this.successMessage =
                  'Your address has been successfully added!';
                this.apiError = '';

                setTimeout(() => {
                  this.successMessage = '';
                  this.router.navigate(['/account/addresses']);
                }, 2000);
              },
              error: (err) => {
                if (err.error && err.error.errors) {
                  this.apiError = err.error.errors.join(', ');
                } else {
                  this.apiError = err.message;
                }
              },
              complete: () => {
                this.isSubmitting = false;
              },
            });
          }
        },
        error: (err) => {
          console.error('Error fetching account:', err);
          this.isSubmitting = false;
        },
      });
    }
  }
}
