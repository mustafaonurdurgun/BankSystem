import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,      
    FormsModule,
    LayoutsModule,
   
  ],
  exports:[
    AdminComponent
  ]
})
export class AdminModule { }
