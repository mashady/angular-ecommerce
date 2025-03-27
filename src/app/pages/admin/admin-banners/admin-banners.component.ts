import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BannerRequestService } from '../../../services/banner-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-banners',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-banners.component.html',
  styleUrl: './admin-banners.component.css'
})
export class AdminBannersComponent {
  bannerForm !: FormGroup;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  submitting = false;
  successMessage: string = '';

  constructor(
    private bannerService: BannerRequestService,
    private fb: FormBuilder,
  )
  {  }

  ngOnInit() {
    this.bannerForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)] ],
      description: ['', [Validators.required, Validators.minLength(10)]],
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

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  addBanner(){
    if( this.bannerForm.invalid) {
      console.log('Banner form is invalid');
      console.log(this.bannerForm.errors);
      console.log(this.bannerForm);
      return;
    }

    this.submitting = true;

    const formData = new FormData();

    Object.keys(this.bannerForm.value).forEach( key => {
      formData.append(key, this.bannerForm.value[key]);
    });


    this.selectedImages.forEach( (image) => {
      formData.append('images', image)
    })

    

    this.bannerService.addBanner(formData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Banner added successfully';
        this.bannerForm.reset();
        this.selectedImages = [];
        this.previewImages = [];
        this.submitting = false;
      },
      error: (error: any) => {
        console.error('Error adding banner', error);
        this.submitting = false;
        }
    })
  }
}
