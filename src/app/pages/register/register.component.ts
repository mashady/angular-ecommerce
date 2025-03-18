import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  apiError: string = '';

  constructor(
    private formbuilder: FormBuilder,
    public AuthService: AuthService,
    public router: Router
  ) {
    this.registerForm = this.formbuilder.group(
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
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
          ],
        ],
        rePassword: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
        ],
        address: ['', [Validators.required, Validators.maxLength(255)]],
        role: [
          '',
          [Validators.required, Validators.pattern('^(user|seller)$')],
        ],
      },
      { validators: this.checkRePasswordMatch }
    );
  }
  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log('form submitted');
      console.log(this.registerForm.value);
      this.AuthService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'success') {
            //localStorage.setItem('userToken', res.token);
            //this.AuthService.decode();
            this.router.navigate(['/home']);
          }
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
  get f() {
    return this.registerForm.controls;
  }
  checkRePasswordMatch(dataForm: any) {
    const password = dataForm.get('password');
    const rePassword = dataForm.get('rePassword');
    if (password && rePassword && password.value !== rePassword.value) {
      rePassword.setErrors({ rePasswordMatch: true });
      return { rePasswordMatch: true };
    }
    return null;
  }
}
