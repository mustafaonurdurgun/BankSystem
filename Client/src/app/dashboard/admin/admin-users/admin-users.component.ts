import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User, UserType } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  formOpen: boolean = false;
  deletedUser: boolean = false;
  userId: number | undefined;
  editedUser: User | null = null;
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
    });
  }
  showUpdateForm(user:User){
    this.editedUser = user;
  }
 userType=UserType;
  updateUser() {
    if (this.editedUser) {      
      this.apiService
        .updateEntity(this.editedUser.id!, this.editedUser, User)
        .then((response) => {
          if (response?.status === ResponseStatus.Ok) {
            window.alert('Kullanıcı başarıyla güncellendi!');
            // İlanları yeniden getirin veya güncel duruma göre ilanları güncelleyin
            let user = this.getUsers();
            this.cancelUpdate(); // Güncelleme formunu kapatın
            this.formOpen = false;
            console.log(user);
          } else {
            window.alert('Kullanıcı güncellenirken hata oluştu.');
          }
        })
        .catch((error) => {
          console.error('Hata oluştu:', error);
          window.alert('Kullanıcı güncellenirken hata oluştu.');
        });
    }
  }
  cancelUpdate() {
    this.editedUser = null;
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
