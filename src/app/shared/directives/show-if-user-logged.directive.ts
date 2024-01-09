import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import * as _ from 'lodash';
import { UserState } from 'src/app/user/store/user.state';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appShowIfUserLogged]'
})
export class ShowIfUserLogged implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private store: Store,
    private authService: AuthService,
  ) {
    this.elementRef.nativeElement.style.display = 'none';
  }

  public ngOnInit(): void {
    this.store.select(UserState.token).pipe(
      distinctUntilChanged(),
      filter(x => !_.isNil(x)),
      takeUntil(this.destroy$),
    ).subscribe(token => {
      this.elementRef.nativeElement.style.display = this.authService.isTokenValid(<string>token) ? 'inherit' : 'none';
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
