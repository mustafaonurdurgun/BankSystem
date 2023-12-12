import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAccountsComponent } from './employee-accounts.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeeAccountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeAccountsComponent,
      },
    ]),
  ]
})
export class EmployeeAccountsModule { }
