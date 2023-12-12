import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserAccountsComponent } from './user-accounts.component';

@NgModule({
  declarations: [UserAccountsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserAccountsComponent,
      },
    ]),
  ],
})
export class UserAccountsModule { }
