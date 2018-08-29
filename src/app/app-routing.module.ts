import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { HomeComponent } from './core/components/home/home.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';

const routes: Routes = [
  { 
    path:'login',
    component:LoginComponent,
    
  },
  { 
    path:'products',
    component:ProductsComponent,
    
  },
  { 
    path:'shopping-cart',
    component:ShoppingCartComponent,
    
  },

  { 
    path:'check-out',
    component:CheckOutComponent,
    canActivate:[AuthGuard]
    
  },
  { 
    path:'order-success/:id',
    component:OrderSuccessComponent,
    canActivate:[AuthGuard]
    
  },
  { 
    path: 'admin/products/new',
    component:ProductFormComponent,
    canActivate:[AuthGuard,AdminAuthGuard]
    
  },
  { 
    path: 'admin/products/:id',
    component:ProductFormComponent,
    canActivate:[AuthGuard,AdminAuthGuard]
    
  },  
  { 
    path:'admin/products',
    component:AdminProductsComponent,
    canActivate:[AuthGuard,AdminAuthGuard]
    
  },
  { 
    path:'admin/orders',
    component:AdminOrdersComponent,
    canActivate:[AuthGuard,AdminAuthGuard]
    
  },
  {
    path:'my/orders',
    component:MyOrdersComponent,
    canActivate:[AuthGuard]
  },
  { 
    path:'',
    component:ProductsComponent,
    
  },
  // {
  //   path: "",
  //   redirectTo:'/login',
  //   pathMatch:'prefix'
  // }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
