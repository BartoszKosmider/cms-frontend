import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILoginDto, IRegisterUserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath = 'api/authentication'

  constructor(
    private http: HttpClient,
  ) { }

  public registerUser(dto: IRegisterUserDto): Observable<IRegisterUserDto> {
    return this.http.post<IRegisterUserDto>(this.basePath + '/registration', dto);
  }

  public registerAdmin(dto: IRegisterUserDto): Observable<IRegisterUserDto> {
    return this.http.post<IRegisterUserDto>(this.basePath + '/registration/admin', dto);
  }

  public login(dto: ILoginDto): Observable<any> {
    return this.http.post(this.basePath + '/login', dto, {
      responseType: 'text'
    });
  }
}
