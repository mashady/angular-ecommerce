import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-section-2',
  imports: [],
  templateUrl: './main-section-2.component.html',
  styleUrl: './main-section-2.component.css'
})
export class MainSection2Component {
  @Input() product: any;

  isDescriptionClicked: boolean = false;
  isReviewClicked: boolean = false;
  viewDescription(): void{
    this.isReviewClicked = false;
    this.isDescriptionClicked = true;
  }

  viewReview(): void{
    this.isDescriptionClicked = false;
    this.isReviewClicked = true;
    console.log(this.product.review.length)
  }
}
