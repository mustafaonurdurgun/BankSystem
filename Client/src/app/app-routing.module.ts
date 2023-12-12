import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContactComponent } from './contact/contact.component';
import { SignComponent } from './sign/sign.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { adminControl, employeeControl, userControl } from './authguard';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserComponent } from './dashboard/user/user.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'sign', component: SignComponent },

  //------------------- Admin DashBoard -------------------\\
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminControl],
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import(
            'src/app/dashboard/admin/admin-profile/admin-profile.module'
          ).then((m) => m.AdminProfileModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/dashboard/admin/admin-users/admin-users.module').then(
            (m) => m.AdminUsersModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import(
            'src/app/dashboard/admin/admin-accounts/admin-accounts.module'
          ).then((m) => m.AdminAccountsModule),
      },
    ],
  },

  //------------------- User DashBoard -------------------\\
  {
    path: 'user',
    component: UserComponent,
    canActivate: [userControl],
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import(
            'src/app/dashboard/user/user-profile/user-profile.module'
          ).then((m) => m.UserProfileModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import(
            'src/app/dashboard/user/user-transaction/user-transaction.module'
          ).then((m) => m.UserTransactionModule),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import(
            'src/app/dashboard/user/user-accounts/user-accounts.module'
          ).then((m) => m.UserAccountsModule),
      },
    ],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [employeeControl],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import(
            'src/app/dashboard/employee/employee-users/employee-users.module'
          ).then((m) => m.EmployeeUsersModule),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import(
            'src/app/dashboard/employee/employee-accounts/employee-accounts.module'
          ).then((m) => m.EmployeeAccountsModule),
      },
    ],
  },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
