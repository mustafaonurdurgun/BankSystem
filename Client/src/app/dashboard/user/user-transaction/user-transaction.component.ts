import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/core/models/account';
import { TransactionsRequest } from 'src/core/models/request/create-transaction-request';
import { UserTransactionsRequest } from 'src/core/models/request/user-transaction-req';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { Transaction } from 'src/core/models/transaction';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.css'],
})
export class UserTransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  currentUser: User | null = null;
  users: User[] = [];
  accounts: Account[] = [];
  myAccount: Account[] = [];
  transactionForm: boolean = false;
  lastTransactions: Transaction[] = [];
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.currentUser.subscribe((U) => {
      this.currentUser = U;
    });
    this.gettransactionsForCurrentUser(this.currentUser?.id!);
    this.apiService.getAllEntities(User).subscribe((U) => {
      this.users = U.data.filter((u) => u.userType === 1);
    });
    this.apiService.getAllEntities(Account).subscribe((U) => {
      this.accounts = U.data.filter((u) => u.user?.userType === 1);
    });
    this.apiService.getAllEntities(Account).subscribe((U) => {
      this.myAccount = U.data.filter(
        (u) => u.user?.id === this.currentUser?.id
      );
    });
    this.apiService.getAllEntities(Transaction).subscribe((u) => {
      this.lastTransactions = u.data;
    });
  }
  gettransactionsForCurrentUser(userId: number) {
    this.apiService.getAllEntities(Transaction).subscribe((response) => {
      if (response.data) {
        // Sadece mevcut kullanıcının hesaplarını filtrelemek için
        this.transactions = response.data.filter(
          (transaction) => transaction.account?.user?.id === userId
          
        );
        console.log(this.transactions);
        
      }
    });
  }
  newTransaction: TransactionsRequest = new TransactionsRequest();
  newUserTransaction: UserTransactionsRequest = new UserTransactionsRequest();
  makeTransaction() {
    this.transactionForm = true;
  }
  async transaction() {
    const trreq: TransactionsRequest = {
      amount: this.newTransaction.amount,
      description: this.newTransaction.description,
      accountID: this.newTransaction.accountID,
    };

    let status = await this.apiService.createEntity<TransactionsRequest>(
      trreq,
      'Transaction'
    );
    if (status?.status === ResponseStatus.Ok) {
      alert('transaction Ekleme Başarılı');
      console.log(status);
    } else {
      alert('transaction Ekleme Başarısız');
    }
    setTimeout(() => {
      this.addUserTransaction();
    }, 2000);
  }
  async addUserTransaction() {
    const latestTransaction =
      this.lastTransactions[this.lastTransactions.length - 1];
    console.log(latestTransaction);

    const usertrreq: UserTransactionsRequest = {
      userID: this.currentUser?.id,
      transactionID: latestTransaction.id,
    };
    let status = await this.apiService.createEntity<UserTransactionsRequest>(
      usertrreq,
      'Usertransactions'
    );
    if (status?.status === ResponseStatus.Ok) {
      alert('UserTransaction Ekleme Başarılı');
      this.transactionForm = false;
    } else {
      alert('UserTransaciton Ekleme Başarısız');
    }
  }
}
