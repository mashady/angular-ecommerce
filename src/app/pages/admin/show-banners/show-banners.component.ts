import { BannerRequestService } from './../../../services/banner-request.service';
import { Component } from '@angular/core';
import { Banner } from '../../../interfaces/banner';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


declare var bootstrap: any;

@Component({
  selector: 'app-show-banners',
  imports: [CommonModule, RouterModule],
  templateUrl: './show-banners.component.html',
  styleUrl: './show-banners.component.css'
})
export class ShowBannersComponent {
  banners !: Banner[];
  
  constructor (
    private bannerService: BannerRequestService,
  ) {}

  ngOnInit() {
    this.bannerService.getBannerList().subscribe({
      next: (response) => {
        this.banners = response.banners;
      } 
    });
  }

  deleteBanner(id: string) {
    this.bannerService.deleteBanner(id).subscribe({
      next: () => {
        this.banners = this.banners.filter(banner => banner._id !== id);
        // Close the modal
        const modalElement = document.getElementById('deleteBanner' + id);
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      },
      error: (err) => {
        console.error('Error deleting banner', err);
        }
    });
  }

}
