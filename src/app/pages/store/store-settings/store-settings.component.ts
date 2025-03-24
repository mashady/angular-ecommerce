import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-store-settings',
  templateUrl: './store-settings.component.html',
  styleUrls: ['./store-settings.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink],
})
export class StoreSettingsComponent implements OnInit {
  storeSettingsForm!: FormGroup;
  storeSettings: any = {};
  apiError: string = '';
  successMessage: string = '';
  isNewStore: boolean = false;

  constructor(
    private storeService: StoreService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeSettingsForm = this.fb.group({
      businessName: ['', Validators.required],
      storeDescription: ['', Validators.required],
      storeBanner: ['', Validators.required],
      storeLogo: ['', Validators.required],
    });

    this.loadStoreSettings();
  }

  loadStoreSettings(): void {
    console.log('loaded');
    this.storeService.getMyStore().subscribe({
      next: (settings: any) => {
        console.log('Store settings loaded:', settings);
        if (settings) {
          console.log(settings);
          this.storeSettings = settings;
          this.isNewStore = false;
          this.storeSettingsForm.patchValue({
            businessName: settings.businessName,
            storeDescription: settings.storeDescription,
            storeBanner: settings.storeBanner,
            storeLogo: settings.storeLogo,
          });
        } else {
          this.isNewStore = true;
        }
      },
      error: (err) => {
        this.isNewStore = true;
        console.error('Error loading store settings:', err);
        if (err.status !== 404) {
          this.apiError = 'Error loading store settings.';
        }
      },
    });
  }

  get f() {
    return this.storeSettingsForm.controls;
  }

  onSubmit(): void {
    if (this.storeSettingsForm.valid) {
      const updatedSettings = { ...this.storeSettingsForm.value };

      if (this.isNewStore) {
        this.storeService.createStore(updatedSettings).subscribe({
          next: () => {
            this.successMessage = 'Your store has been successfully created!';
            this.apiError = '';
            setTimeout(() => {
              this.successMessage = '';
              this.router.navigate(['/store/settings']);
            }, 2000);
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
        if (!this.storeSettings) {
          console.error('Store settings are missing.');
          return;
        }

        const isSettingsChanged =
          this.storeSettings.businessName !== updatedSettings.businessName ||
          this.storeSettings.storeDescription !==
            updatedSettings.storeDescription ||
          this.storeSettings.storeBanner !== updatedSettings.storeBanner ||
          this.storeSettings.storeLogo !== updatedSettings.storeLogo;

        if (!isSettingsChanged) {
          this.apiError =
            'No changes detected. The settings are already the same.';
          this.successMessage = '';
          return;
        }

        this.storeService
          .updateStore(this.storeSettings._id, updatedSettings)
          .subscribe({
            next: () => {
              this.successMessage =
                'Your store settings have been successfully updated!';
              this.apiError = '';
              setTimeout(() => {
                this.successMessage = '';
                this.router.navigate(['/store/settings']);
              }, 2000);
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
    } else {
      console.log('Form is invalid!');
    }
  }
}
