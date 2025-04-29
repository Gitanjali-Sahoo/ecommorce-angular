import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './layout/admin/dashboard/dashboard.component';
import { NewProductComponent } from './layout/admin/new-product/new-product.component';
import { MainLayoutComponent } from './layout/public/main-layout/main-layout.component';
import { HomeComponent } from './layout/public/routes/home/home.component';
import { ProductDetailsComponent } from './layout/public/routes/product-details/product-details.component';
import { CartComponent } from './layout/public/routes/cart/cart.component';
import { AboutComponent } from './layout/public/routes/about/about.component';
import { ContactComponent } from './layout/public/routes/contact/contact.component';
import { CheckOutComponent } from './layout/public/routes/check-out/check-out.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'newProduct', component: NewProductComponent },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'check-out', component: CheckOutComponent },
    ],
  },
];
