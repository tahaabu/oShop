import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'shared/Models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/Models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product:Product;
  @Input('show-actions') showActions:boolean;
  @Input('shopping-cart') shoppingCart:ShoppingCart;


  constructor(private cartService:ShoppingCartService) { }
  ngOnInit(){
    // console.log(this.product),
    // console.log(this.shoppingCart)
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }  
}
