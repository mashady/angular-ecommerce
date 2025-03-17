import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-main-section-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-section-2.component.html',
  styleUrl: './main-section-2.component.css'
})
export class MainSection2Component implements OnInit {
  @Input() product?: Product;

  isDescriptionClicked: boolean = true; // Default to showing description
  isReviewClicked: boolean = false;
  
  ngOnInit() {
    // Initialize with description view by default
    this.isDescriptionClicked = true;
    this.isReviewClicked = false;
  }

  viewDescription(): void {
    this.isReviewClicked = false;
    this.isDescriptionClicked = true;
  }

  viewReview(): void {
    this.isDescriptionClicked = false;
    this.isReviewClicked = true;
  }
} 