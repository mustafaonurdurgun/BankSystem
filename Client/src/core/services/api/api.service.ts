import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, share, throwError } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { BaseDataResponse } from '../../models/response/base-data-response.model';
import { TokenResponse } from '../../models/response/token-response.model';
import { LoginRequest } from '../../models/request/login-request.model';
import { RegisterRequest } from '../../models/request/register-request.model';

import { BaseResponse } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { PasswordRequest } from 'src/core/models/request/pw-request-model';
import { MailRequest } from 'src/core/models/request/mail-request-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint = environment.api_url;
  constructor(private readonly http: HttpClient) {}
  login(request: LoginRequest): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/Login',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  register(
    request: RegisterRequest
  ): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .post<BaseDataResponse<TokenResponse>>(
        //ENDPOINT DEĞİŞECEK (/signin olacak)
        this.endpoint + '/Auth/Register',
        request
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  refreshToken(token: string): Observable<BaseDataResponse<TokenResponse>> {
    return this.http
      .get<BaseDataResponse<TokenResponse>>(
        this.endpoint + '/Auth/RefreshToken',
        { params: new HttpParams().append('token', token) }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getProfileInfo(): Observable<BaseDataResponse<User>> {
    return this.http
      .get<BaseDataResponse<User>>(this.endpoint + '/Auth/GetProfileInfo')
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getAllEntities<TEntity>(entityType: Type<TEntity>) {
    return this.http
      .request<BaseDataResponse<TEntity[]>>(
        'get',
        environment.api_url + '/' + entityType.name + '/GetAll'
      )
      .pipe(share());
  }

  deleteEntity<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http
      .delete<BaseResponse>(
        environment.api_url + '/' + entityType.name + '/Delete?id=' + id
      )
      .pipe(share())
      .toPromise();
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.http
      .post<BaseDataResponse<TEntity[]>>(
        environment.api_url + '/' + entityType + '/Create',
        entity
      )
      .pipe(share())
      .toPromise();
  }

  getEntityById<TEntity>(id: number, entityType: Type<TEntity>) {
    return this.http
      .get<BaseDataResponse<TEntity>>(
        `${environment.api_url}/${entityType.name}/GetById?id=${id}`
      )
      .pipe(share())
      .toPromise();
  }

  //Güncelleme kodları
  updateEntity<TEntity>(
    id: number,
    entity: TEntity,
    entityType: Type<TEntity>
  ) {
    return this.http
      .put<BaseDataResponse<TEntity>>(
        environment.api_url + '/' + entityType.name + '/Update?id=' + id,
        entity
      )
      .pipe(share())
      .toPromise();
  }
  mailSender(mail: MailRequest): Observable<any> {
    return this.http.post(`${this.endpoint}/Mail/SendMail`, mail);
  }

  pwChanger(pw: PasswordRequest) {
    return this.http
      .put<BaseDataResponse<User>>(`${this.endpoint}/User/ChangePassword`, pw)
      .pipe(share())
      .toPromise();
  }
  getImage(email: string) {
    return "http://localhost:5258/api/Image/GetImage?resimKimlik=" + email + '.jpeg';
  }

  uploadProfileImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.endpoint}/Image/UploadImage`, formData);
  }
}
