import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAdminAccount, ILoginDto, IRegisterUserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath = 'http://localhost:5000/api/'

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

  public getAdmins(): Observable<IAdminAccount[]> {
    return of([
      { username: 'dupa1' },
      { username: 'dupa2' },
      { username: 'dupa3' },
    ])
    // return this.http.get<IAdminAccount[]>(this.basePath);
  }

  public deleteAdmins(adminsToDelete: string[]): Observable<any> {
    return of();
    // return this.http.get<IAdminAccount[]>(this.basePath);
  }
}
