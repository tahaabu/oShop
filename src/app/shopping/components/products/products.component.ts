import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/Models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/Models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[]=[];
  filteredProducts:Product[]=[];
  cart$:Observable<ShoppingCart>;

  
  category;
  constructor(
    private producService:ProductService,    
    private route:ActivatedRoute,
    private cartservice:ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartservice.getCart();   
    this.populateProducts();
  }

  private populateProducts(){
    this.producService
    .getAll()
    .pipe(
      switchMap((product:Product[])=>{
       this.products=product;
       return this.route.queryParamMap;
     })
     )
     .subscribe(param=>{
       this.category=param.get('category');
       this.applyFilter();
     })  
  }
  
  private applyFilter(){
    this.filteredProducts = (this.category)?
    this.products.filter(p=>p.category===this.category):this.products;
  }


}
