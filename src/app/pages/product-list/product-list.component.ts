import { Component } from '@angular/core';
import { ShopNowComponent } from './shop-now/shop-now.component';
import { SideBarComponent } from  './side-bar/side-bar.component';
import { AllproductComponent } from './allproduct/allproduct.component';


@Component({
  selector: 'app-product-list',
  imports: [ShopNowComponent,SideBarComponent,AllproductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
