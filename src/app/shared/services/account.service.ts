import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private basePath = 'api/account'

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers(role: UserRole): Observable<string[]> {
    const params = {
      targetRole: role,
    }

    return this.http.get<string[]>(this.basePath + '/list', { params: params });
  }

  public deleteUsers(accounts: string[]): Observable<any> {
    const params = {
      targetAccount: accounts,
    }
    return this.http.delete<any[]>(this.basePath + '/admin', { params: params });
  }

  public deleteCurrentUser(): Observable<any> {
    return this.http.delete<any[]>(this.basePath);
  }
}
