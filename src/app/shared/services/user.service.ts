import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginDto, IRegisterUserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath = 'http://localhost:5012/api/'

  constructor(
    private http: HttpClient,
  ) { }

  public registerUser(dto: IRegisterUserDto): Observable<IRegisterUserDto> {
    return this.http.post<IRegisterUserDto>(this.basePath + 'authentication/registration', dto);
  }

  public registerAdmin(dto: IRegisterUserDto): Observable<IRegisterUserDto> {
    return this.http.post<IRegisterUserDto>(this.basePath + 'authentication/registration/admin', dto);
  }

  public login(dto: ILoginDto): Observable<any> {
    return this.http.post(this.basePath + 'authentication/login', dto, {
      responseType: 'text'
    });
  }
}
