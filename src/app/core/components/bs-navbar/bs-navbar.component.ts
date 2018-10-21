import { Component, OnInit} from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/Models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/Models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit  {

  aUser:AppUser;
  cart$:Observable<ShoppingCart>;
  collapsed = true;


  constructor(public auth:AuthService,private cartService:ShoppingCartService) {     
    this.auth.appUser$.subscribe((data:AppUser)=>this.aUser=data); 
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  async ngOnInit(){
   this.cart$ = (await this.cartService.getCart()); 
 
  }

 logout(){  
  this.auth.logout();
 }

}
