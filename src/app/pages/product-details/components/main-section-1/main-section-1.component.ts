import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-main-section-1',
  imports: [],
  templateUrl: './main-section-1.component.html',
  styleUrl: './main-section-1.component.css',
})
export class MainSection1Component {
  @Input() product: any;

}
  
