import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CartComponent } from './pages/cart/cart.component';
import { authGuard } from './guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { DashboardComponent } from './pages/account/dashboard/dashboard.component';
import { OrdersComponent } from './pages/account/orders/orders.component';
import { AddressesComponent } from './pages/account/addresses/addresses.component';
import { AccountDetailsComponent } from './pages/account/account-details/account-details.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { OrderDetailsComponent } from './pages/account/order-details/order-details.component';
import { EditAddressesComponent } from './pages/account/edit-addresses/edit-addresses.component';
import { AdminAddProductComponent } from './pages/admin/admin-add-product/admin-add-product.component';
import { AdminUpdateProductComponent } from './pages/admin/admin-update-product/admin-update-product.component';
import { NewAddressComponent } from './pages/account/new-address/new-address.component';
import { StoreComponent } from './pages/store/store.component';
import { StoreDashboardComponent } from './pages/store/store-dashboard/store-dashboard.component';
import { StoreOrdersComponent } from './pages/store/store-orders/store-orders.component';
import { StoreOrderDetailsComponent } from './pages/store/store-order-details/store-order-details.component';
import { StoreProductsComponent } from './pages/store/store-products/store-products.component';
import { StoreEditProductComponent } from './pages/store/store-edit-product/store-edit-product.component';
import { StoreNewProductComponent } from './pages/store/store-new-product/store-new-product.component';
import { StoreSettingsComponent } from './pages/store/store-settings/store-settings.component';
import { StoreDetailsComponent } from './pages/store/store-details/store-details.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { AdminOrderDetailsComponent } from './pages/admin/admin-order-details/admin-order-details.component';
import { WishlistComponent } from './pages/wish-list/wish-list/wish-list.component';
import { adminGuard } from './guards/admin.guard';
import { sellerGuard } from './guards/seller.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { GoogleCallbackComponent } from './pages/google-callback/google-callback.component';
import { ProductsComponent } from './pages/products/products.component';

import { AdminBannersComponent } from './pages/admin/admin-banners/admin-banners.component';
import { AdminCouponsComponent } from './pages/admin/admin-coupons/admin-coupons.component';
import { UpdateBannerComponent } from './pages/admin/update-banner/update-banner.component';
import { ShowBannersComponent } from './pages/admin/show-banners/show-banners.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },

  {
    path: 'unauthorized',
    component:UnauthorizedComponent ,
    title: 'Aunthorized Page',
  },
  {
    path: 'products',
    component:ProductsComponent ,
    title: 'products Page',
  },
  { path: 'explore/store/:id', component: StoreDetailsComponent },
  { path: 'auth-success', component: GoogleCallbackComponent },

  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'addresses/edit/:id', component: EditAddressesComponent },
      { path: 'addresses/new', component: NewAddressComponent },
      { path: 'details', component: AccountDetailsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },//aunthorized
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [sellerGuard],

    children: [
      { path: 'dashboard', component: StoreDashboardComponent },
      { path: 'orders', component: StoreOrdersComponent },
      { path: 'orders/:id', component: StoreOrderDetailsComponent },
      { path: 'products', component: StoreProductsComponent },
      { path: 'products/edit/:id', component: StoreEditProductComponent },
      { path: 'products/new', component: StoreNewProductComponent },
      { path: 'settings', component: StoreSettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/add', component: AdminAddProductComponent },
      { path: 'products/update/:id', component: AdminUpdateProductComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'orders/:id', component: AdminOrderDetailsComponent },
      { path: 'coupons', component: AdminCouponsComponent },
      { path: 'add-banners', component: AdminBannersComponent },
      { path: 'banners', component: ShowBannersComponent },
      { path: 'banners/update/:id', component: UpdateBannerComponent },
    ],
  },


  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Product Details Page',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'wish-list',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found Page',
  },

];
