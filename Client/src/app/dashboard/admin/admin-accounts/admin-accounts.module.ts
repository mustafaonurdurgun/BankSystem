import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAccountsComponent } from './admin-accounts.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminAccountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminAccountsComponent,
      },
    ]),
  ]
})
export class AdminAccountsModule { }
