import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserTransactionComponent } from './user-transaction.component';

@NgModule({
  declarations: [UserTransactionComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserTransactionComponent,
      },
    ]),
  ],
})
export class UserTransactionModule {}
