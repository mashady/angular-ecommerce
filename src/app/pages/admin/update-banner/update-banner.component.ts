import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Banner } from '../../../interfaces/banner';
import { BannerRequestService } from '../../../services/banner-request.service';

@Component({
  selector: 'app-update-banner',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-banner.component.html',
  styleUrl: './update-banner.component.css'
})
export class UpdateBannerComponent {
  bannerForm !: FormGroup;
  bannerId : string = '';
  banner !: Banner;
  submitting = false;
  successMessage = '';
  existingImages: string[] = [];
  selectedImages: File[] = [];
  previewImages: string[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bannerService: BannerRequestService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bannerForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)] ],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.bannerId = this.route.snapshot.params['id'] || '';

    if(!this.bannerId) {
      console.error('No banner ID provided');
      this.router.navigate(['/admin/banners']);
      return;
    }

    this.bannerService.getBannerById(this.bannerId).subscribe({
      next: (banner) => {
        this.banner = banner;
        this.bannerForm.patchValue({
          title: banner.title,
          description: banner.description,
        });

        if( banner.images && banner.images.length ) {
          this.existingImages = banner.images;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.loadProductData();

    
  }

  loadProductData() {
    this.bannerService.getBannerById(this.bannerId).subscribe({
      next: (banner) => {
        this.banner = banner;

        this.bannerForm.patchValue({
          title: banner.title,
          description: banner.description,
        });

        if( banner.images && banner.images.length ) {
          this.existingImages = banner.images;
        }
      },
      error: (err) => {
        console.error('Error loading product', err);
      }
    });
  }

  onFilesSelect(event: Event){
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const newImages = Array.from(input.files);
      this.selectedImages = [...this.selectedImages, ...newImages];

      newImages.forEach( file => {
        const imageReader = new FileReader();
        imageReader.onload = () => {
          this.previewImages.push(imageReader.result as string);
        };
        imageReader.readAsDataURL(file);
      });
    }
  }

  removeNewImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.previewImages.splice(index, 1);
  }
  addBanner() {
    this.submitting = true;
    const formData = new FormData();
    
    Object.keys(this.bannerForm.value).forEach( key => {
      formData.append(key, this.bannerForm.value[key]);
    });

    this.selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    this.bannerService.updateBanner(this.bannerId, formData).subscribe({
      next: () => {
        this.successMessage = 'Banner updated successfully';
        this.submitting = false;
        this.router.navigate(['/admin/banners']);
      },
      error: (err) => {
        console.log(err);
        this.submitting = false;
      }
    })
  }
}
