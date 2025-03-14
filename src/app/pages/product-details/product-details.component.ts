import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { MainSection1Component } from './components/main-section-1/main-section-1.component';
import { MainSection2Component } from './components/main-section-2/main-section-2.component';

@Component({
  selector: 'app-product-details',
  imports: [MainSection1Component, MainSection2Component],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  currProduct: Product = {
    _id: '',
    name: 'Marketside Fresh Organic Bananas,Bunch',
    description: 'Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent tacitisociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.',
    price: 20,
    discount: 35,
    category: 'Fruits & Vegetables',
    addedBy: '',
    updatedBy: '',
    images: ['https://s3-alpha-sig.figma.com/img/5a9d/f4e2/6e67bb4edf84a12b412de243912b50f9?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mkUolVAY3HOy087E4U37QoTm6mWosRqhQsOvIt87OQM7uVzxMRSTfmeXWYrQe9wXrpYUN--Kvb4GFtciIBT8Q2ELyZ0tepu9dLPLelEUdxJHHXTkz~dfMZOx8Hp-~zBeqAAP6WUuu8pYzhagFrwzD3Q3kq8krY-oSnz5v5SrWAftUvZk0GpbU5ux7G1iYailZKzr2yinFDyXTunRYcd2T~QjGPWhUvVzIsdQiszrR9tOeAInEQRCCJP32Y0iTHdwMGAZGyuVeOVw~OhADoUn~wBBhUvYLuFQOhYedQkwG3e9BtuL7xT~kV8yKLlUCZrLWhsIpdjUYdDhZ4CgxVQPHg__','https://s3-alpha-sig.figma.com/img/5a9d/f4e2/6e67bb4edf84a12b412de243912b50f9?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mkUolVAY3HOy087E4U37QoTm6mWosRqhQsOvIt87OQM7uVzxMRSTfmeXWYrQe9wXrpYUN--Kvb4GFtciIBT8Q2ELyZ0tepu9dLPLelEUdxJHHXTkz~dfMZOx8Hp-~zBeqAAP6WUuu8pYzhagFrwzD3Q3kq8krY-oSnz5v5SrWAftUvZk0GpbU5ux7G1iYailZKzr2yinFDyXTunRYcd2T~QjGPWhUvVzIsdQiszrR9tOeAInEQRCCJP32Y0iTHdwMGAZGyuVeOVw~OhADoUn~wBBhUvYLuFQOhYedQkwG3e9BtuL7xT~kV8yKLlUCZrLWhsIpdjUYdDhZ4CgxVQPHg__','https://s3-alpha-sig.figma.com/img/5a9d/f4e2/6e67bb4edf84a12b412de243912b50f9?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mkUolVAY3HOy087E4U37QoTm6mWosRqhQsOvIt87OQM7uVzxMRSTfmeXWYrQe9wXrpYUN--Kvb4GFtciIBT8Q2ELyZ0tepu9dLPLelEUdxJHHXTkz~dfMZOx8Hp-~zBeqAAP6WUuu8pYzhagFrwzD3Q3kq8krY-oSnz5v5SrWAftUvZk0GpbU5ux7G1iYailZKzr2yinFDyXTunRYcd2T~QjGPWhUvVzIsdQiszrR9tOeAInEQRCCJP32Y0iTHdwMGAZGyuVeOVw~OhADoUn~wBBhUvYLuFQOhYedQkwG3e9BtuL7xT~kV8yKLlUCZrLWhsIpdjUYdDhZ4CgxVQPHg__'],
    stock: 20,
    reviews: ['Marketside Fresh Organic Bananas,Bunch', 'Marketside Fresh Organic Bananas,Bunch', 'Marketside Fresh Organic Bananas,Bunch'],
    createdAt: '',
    updatedAt: '',
  };
}
