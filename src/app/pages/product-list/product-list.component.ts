import { Component } from '@angular/core';
import { ListProductComponent } from './list-product/list-product.component';
import { ShopNowComponent } from './shop-now/shop-now.component';
import { SideBarComponent } from  './side-bar/side-bar.component';

@Component({
  selector: 'app-product-list',
  imports: [ListProductComponent,ShopNowComponent,SideBarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

}
