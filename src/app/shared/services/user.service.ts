import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAdminAccount, ILoginDto, IRegisterUserDto } from '../models/user.model';

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
