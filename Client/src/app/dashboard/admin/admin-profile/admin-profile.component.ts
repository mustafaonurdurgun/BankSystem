import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordRequest } from 'src/core/models/request/pw-request-model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  user: User | null = null;
  pw: PasswordRequest = new PasswordRequest();
  showPwChange: boolean = false;
  confirmPassword = '';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.authService.currentUser.subscribe((u) => {
      this.user = u;      
    });    
    this.apiService.getImage(this.user?.email!);
  }


  async changePassword() {
    this.pw.email = this.user?.email;
    if (this.pw.password === this.confirmPassword) {
      let status = await this.apiService
        .pwChanger(this.pw)
        .then((response) => response?.status);
      if (status == ResponseStatus.Ok) {
        alert('şifreniz başarıyla değiştirildi');
        this.cancelUpdate();
      } else {
        alert('bir hata oluştu');
      }
    } else {
      // Şifreler eşleşmiyor, kullanıcıya bir hata mesajı gösterebilirsiniz.
      alert('Şifreler eşleşmiyor');
    }
  }

  showChangeModal() {
    this.showPwChange = true;
  }
  cancelUpdate() {
    this.showPwChange = false;
    this.pw.password = '';
    this.confirmPassword='';
  }

 


}
