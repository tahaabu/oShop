import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HomeComponent,    
    LoginComponent,
    BsNavbarComponent,  
  ],
  exports:[
    BsNavbarComponent
  ]
})
export class CoreModule { }
