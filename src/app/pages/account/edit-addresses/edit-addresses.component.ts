import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-addresses',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edit-addresses.component.html',
  styleUrl: './edit-addresses.component.css',
})
export class EditAddressesComponent implements OnInit {
  addressForm!: FormGroup;
  addressId!: string;
  address!: any;
  apiError: string = '';
  successMessage: string = '';
  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
    });

    this.route.paramMap.subscribe((params) => {
      this.addressId = params.get('id')!;
      this.loadAddress();
    });
  }

  loadAddress(): void {
    this.accountService.account$?.subscribe({
      next: (account) => {
        if (!account) {
          console.log('Account data is not available yet.');
        } else {
          this.address = account.user.address.find(
            (address: any) => address._id === this.addressId
          );

          if (this.address) {
            this.addressForm.patchValue({
              address: this.address.address,
              city: this.address.city,
              country: this.address.country,
              zip: this.address.zip,
            });
            console.log('Address found and form updated:', this.address);
          } else {
            console.log('Address not found.');
          }
        }
      },
      error: (err) => {
        console.error('Error fetching account:', err);
      },
    });
  }

  get f() {
    return this.addressForm.controls;
  }
  onSubmit(): void {
    if (this.addressForm.valid) {
      const updatedAddress = { ...this.addressForm.value };
      console.log(updatedAddress);
      this.accountService
        .updateAccount({ address: [updatedAddress] })
        .subscribe({
          next: () => {
            this.successMessage = 'Your address has been successfully updated!';
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/account']);
            }, 3000);
          },
          error: (err) => {
            if (err.error && err.error.errors) {
              this.apiError = err.error.errors.join(', ');
            } else {
              this.apiError = err.message;
            }
          },
        });
    } else {
      console.log('Form is invalid!');
    }
  }
}
