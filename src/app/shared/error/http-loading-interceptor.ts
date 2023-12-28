import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, finalize, throwError } from "rxjs";
import { UserInteractionsService } from '../user-interactions/user-interactions.service';
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { IErrorDialogData } from "../models/app.model";
import * as _ from "lodash";

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(
    private userInteractionsService: UserInteractionsService,
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userInteractionsService.isLoading.next(true);
    const token = localStorage.getItem('UserState.token');
    if (!_.isNil(token) && token.trim() !== '') {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token.slice(1, -1)}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.userInteractionsService.openCustomPopup<ErrorDialogComponent, IErrorDialogData>(ErrorDialogComponent, {
          error: error,
        });
        throw error;
      }),
      finalize(() => {
        this.userInteractionsService.isLoading.next(false);
      }),
    );
  }
}
