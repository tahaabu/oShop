import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,private cartService:ShoppingCartService) { }

  placeOrder(order){
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }
  getOrders() { 
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders/', ref=>
      ref.orderByChild('userId').
        equalTo(userId)     
      ).valueChanges();
  }
}
