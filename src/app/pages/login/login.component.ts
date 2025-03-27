import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CounterServiceService } from '../../services/counter.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  apiError: string = '';

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  phonePattern = /^[0-9]{10,15}$/; //"^[0-9]{10,15}$"
  constructor(
    private formBuilder: FormBuilder,
    public AuthService: AuthService,
    public router: Router,
    public counterServiceService:CounterServiceService
  ) {
    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required, this.emailOrPhoneValidator()]],
      password: ['', Validators.required],
    });
  }

  emailOrPhoneValidator() {
    return (control: any) => {
      const value = control.value;
      if (!value) return null;

      const isEmailValid = this.emailPattern.test(value);
      const isPhoneValid = this.phonePattern.test(value);

      if (isEmailValid || isPhoneValid) {
        return null;
      } else {
        return { invalidEmailOrPhone: true };
      }
    };
  }
  ngOnInit() {
    console.log(this.AuthService.userData.value);
  }
  onSubmit() {
    const loginData: any = {
      password: this.loginForm.value.password,
    };
    const emailOrPhoneValue = this.loginForm.value.emailOrPhone;
    if (this.emailPattern.test(emailOrPhoneValue)) {
      loginData.email = emailOrPhoneValue;
    } else if (this.phonePattern.test(emailOrPhoneValue)) {
      loginData.phoneNumber = emailOrPhoneValue;
    }
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      console.log(loginData);
      this.AuthService.login(loginData).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'Logged in successfully.') {
            localStorage.setItem('userToken', res.token);
            console.log(res.token);
            this.AuthService.decode();
            // counter sevice
            this.counterServiceService.refreshWishCounter()
            console.log(this.AuthService.userData.value);
            this.apiError = '';
            console.log('navigate');
            this.router.navigate(['/account']);
          }
        },
        error: (err) => {
          console.log(err.error.message);
          if (err.error && err.error.errors) {
            this.apiError = err.error.errors.join(', ');
          } else {
            this.apiError = err.error.message;
          }
        },
      });
    }
  }
  get f() {
    return this.loginForm.controls;
  }
}
