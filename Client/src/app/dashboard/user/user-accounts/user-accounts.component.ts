import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/core/models/account';
import { AccountRequest } from 'src/core/models/request/create-account-request';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css'],
})
export class UserAccountsComponent implements OnInit {
  accounts: Account[] = [];
  currentUser?: User | null = null;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.currentUser.subscribe((U) => {
      this.currentUser = U;
    });
    this.getAccountsForCurrentUser(this.currentUser?.id!);

  }
  getAccounts() {
    this.apiService.getAllEntities(Account).subscribe((u) => {
      this.accounts = u.data;
    });
  }
  getAccountsForCurrentUser(userId: number) {
    this.apiService.getAllEntities(Account).subscribe((response) => {
      if (response.data) {
        // Sadece mevcut kullanıcının hesaplarını filtrelemek için
        this.accounts = response.data.filter(
          (account) => account.user?.id === userId
        );
      }
    });
  }
  newAccount: Account = new Account();

  async addAccount() {
    // Kullanıcıya onay isteği göster
    const userConfirmed = window.confirm('Hesap eklemek istediğinizden emin misiniz?');
  
    if (userConfirmed) {
      const req: AccountRequest = {
        balance: 0,
        userId: this.currentUser?.id,
      };
      let status = await this.apiService.createEntity<AccountRequest>(
        req,
        'Account'
      );
      if (status?.status == ResponseStatus.Ok) {
        alert('Hesap Ekleme Başarılı');
        this.getAccounts();
        console.log(status);
      } else {
        alert('Hesap Ekleme Başarısız');
      }
    } else {
      alert('Hesap ekleme işlemi iptal edildi.');
    }
  }
  
}
