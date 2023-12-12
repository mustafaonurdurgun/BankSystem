import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';

import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
@Component({
  selector: 'app-employee-users',
  templateUrl: './employee-users.component.html',
  styleUrls: ['./employee-users.component.css'],
})
export class EmployeeUsersComponent implements OnInit {
  users: User[] = [];
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getAllEntities(User).subscribe((users) => {
      this.users = users.data.sort((a, b) => a.id! - b.id!);
      this.users = users.data.filter((response) => response.userType === 1);
    });
  }
  

  
  onDelete(id: any) {
    const confirmDelete = window.confirm('Silmek istiyor musunuz?');
    if (confirmDelete) {
      let status = this.apiService.deleteEntity(id, User);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('Kullanıcı silindi!');
          this.getUsers();
          this.router.navigate(['admin/users']);
        } else {
          window.alert('Silme işleminde hata oluştu');
        }
      });
    } else {
      window.alert('Silme işlemi iptal edildi');
    }
  }
}
