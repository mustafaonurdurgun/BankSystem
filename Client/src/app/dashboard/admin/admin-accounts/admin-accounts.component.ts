import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/core/models/account';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent implements OnInit{
  accounts:Account[]=[]
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
   this.getAccounts();
  }
  getAccounts(){
    this.apiService.getAllEntities(Account).subscribe(r=>{
      this.accounts=r.data;
    })
  }
  onDelete(id: any) {
    const confirmDelete = window.confirm('Silmek istiyor musunuz?');
    if (confirmDelete) {
      let status = this.apiService.deleteEntity(id, Account);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('Hesap silindi!');
          this.getAccounts();
          this.router.navigate(['admin/accounts']);
        } else {
          window.alert('Silme işleminde hata oluştu');
        }
      });
    } else {
      window.alert('Silme işlemi iptal edildi');
    }
  }
}
