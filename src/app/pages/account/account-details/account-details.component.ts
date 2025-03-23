import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AccountService } from '../../../services/account.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-account-details',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
  editAccountForm!: FormGroup;
  account!: any;
  apiError: string = '';
  successMessage: string = '';

  constructor(public accountService: AccountService, private fb: FormBuilder) {
    console.log();
  }
  ngOnInit(): void {
    this.editAccountForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
        ],
        currentPassword: [
          '',
          [
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
          ],
        ],
        confirmPassword: [''],
      },

      { validators: this.checkRePasswordMatch }
    );
    this.accountService.account$?.subscribe({
      next: (account) => {
        if (!account) {
          console.log('Account data is not available yet.');
        } else {
          this.account = account.user;
          console.log('user:', this.account.address);

          console.log('Account received:', account);
          this.editAccountForm.patchValue({
            firstName: account.user.firstName,
            lastName: account.user.lastName,
            email: account.user.email,
            phoneNumber: account.user.phoneNumber,
          });
          console.log('Form Updated:', this.editAccountForm.value);
        }
      },
    });
  }
  checkRePasswordMatch(dataForm: any) {
    const newPassword = dataForm.get('newPassword');
    const rePassword = dataForm.get('confirmPassword');
    if (newPassword && rePassword && newPassword.value !== rePassword.value) {
      rePassword.setErrors({ rePasswordMatch: true });
      return { rePasswordMatch: true };
    }
    return null;
  }
  get f() {
    return this.editAccountForm.controls;
  }

  onSubmit(): void {
    if (this.editAccountForm.valid) {
      const formData = { ...this.editAccountForm.value };
      if (!formData.currentPassword) delete formData.currentPassword;
      if (!formData.newPassword) delete formData.newPassword;
      delete formData.confirmPassword;

      this.accountService.updateAccount(formData).subscribe({
        next: () => {
          console.log('Account updated successfully');
          this.successMessage = 'Your account has been successfully updated!';
          setTimeout(() => {
            this.successMessage = '';
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
    }
  }
}
