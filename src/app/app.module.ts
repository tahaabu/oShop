import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),   
    AppRoutingModule,  
    SharedModule,
    AdminModule,   
    ShoppingModule,
    CoreModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
