import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$:Observable<any>;
  product= {};
  id;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private categoryService:CategoryService,
    private productService:ProductService) {
    this.categories$= this.categoryService.getAll();
     this.id= this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.productService.get(this.id).pipe(take(1)).subscribe(x=>this.product=x); 
    }
   }
   save(product){  
     if(this.id){
      this.productService.update(this.id,product)
     }else   
     this.productService.create(product);
     this.router.navigate(['/admin/products']);
   }

   delete(){
     if (confirm("Are You Sure")){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);

     }
   }

  ngOnInit() {
  }

}
