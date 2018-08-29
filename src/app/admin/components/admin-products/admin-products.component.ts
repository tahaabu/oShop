import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import {Subscription} from 'rxjs'
import { Product } from 'shared/Models/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products:Product[];
  filterProducts:Product[];
  sub:Subscription;
  constructor(private productService:ProductService) { 
    this.sub= this.productService.getAll().subscribe((products:Product[])=>{this.filterProducts = this.products = products});
  }

  filter(query){
    this.filterProducts = (query) ?
      this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):
      this.products;
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  ngOnInit() {
  }

}
