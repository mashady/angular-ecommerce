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
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'addresses/edit', component: EditAddressesComponent },
      { path: 'details', component: AccountDetailsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent }, 
      { path: 'products/add', component: AdminAddProductComponent }, 
      { path: 'products/update/:id', component: AdminUpdateProductComponent }, 
      //{ path: 'orders', component: OrdersComponent },
    ],
  },
  {
    path: 'products-list',
    component: ProductListComponent,
    title: 'Poroducts List Page',
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
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found Page',
  },
];
