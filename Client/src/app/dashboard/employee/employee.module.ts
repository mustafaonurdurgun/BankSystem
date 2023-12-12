import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutsModule } from 'src/app/layouts/layouts.module';



@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,      
    FormsModule,
    LayoutsModule,
  ],
  exports:[
    EmployeeComponent
  ]
})
export class EmployeeModule { }
