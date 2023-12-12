import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeUsersComponent } from './employee-users.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeeUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeUsersComponent,
      },
    ]),
  ]
})
export class EmployeeUsersModule { }
