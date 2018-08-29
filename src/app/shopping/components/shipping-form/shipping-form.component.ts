import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/Models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'shared/Models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
  @Input('cart') cart:ShoppingCart
  shipping = {};  
  userId:string;
  userSubscription:Subscription;
  constructor(private orderService:OrderService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.userSubscription =  this.authService.user$.subscribe((user)=>this.userId=user.uid)

  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId,this.shipping,this.cart)
    let result= await this.orderService.placeOrder(order);   
    this.router.navigate(['/order-success',result.key]);
  }
}
