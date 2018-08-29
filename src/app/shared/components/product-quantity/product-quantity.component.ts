import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/Models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/Models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit  {
  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }
  ngOnInit(){
    
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }
 
  
}
