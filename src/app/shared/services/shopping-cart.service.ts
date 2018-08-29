import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/Models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/Models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }



  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return  this.db.object('/shopping-carts/' + cartId ).valueChanges().pipe(map(( x:ShoppingCart )=> new ShoppingCart( x.items )));
  }

  async clearCart(){
   let cartId= await this.getOrCreateCartId();  
   this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  addToCart(product:Product){
      this.updateItemQuantity(product,1);
  }
  removeFromCart(product:Product){
    this.updateItemQuantity(product,-1);  
  }

  private create(){
    return this.db.list('/shopping-carts/').push({
      dateCreated:new Date().getTime()
    })
  }

  private async getOrCreateCartId(){
    let cartId=localStorage.getItem('cartId');
    if(cartId)return cartId;  
        
    let res = await this.create();     
    localStorage.setItem('cartId',res.key);
    return res.key; 
      
  }

  private async updateItemQuantity(product:Product,change:number){
    let cartId= await this.getOrCreateCartId();
    let itemRef =this.db.object('/shopping-carts/' + cartId +'/items/' + product.key);
    let item$= itemRef.valueChanges();
    item$.pipe(take(1)).subscribe(item=>{
      let quantity;
      if(item){
        quantity=item['quantity'] + change
         if(quantity === 0){
           itemRef.remove();
         }
         else{
          itemRef.update({product:product, quantity: quantity});  
         }     
      }else  itemRef.update({product:product, quantity: 1});
      
     
    }); 
  }

}
