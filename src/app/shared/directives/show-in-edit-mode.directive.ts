import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SiteState } from 'src/app/site-template/store/site.state';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import * as _ from 'lodash';

@Directive({
  selector: '[appShowInEditMode]'
})
export class ShowInEditModeDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.store.select(SiteState.isEditMode).pipe(
      distinctUntilChanged(),
      filter(x => !_.isNil(x)),
      takeUntil(this.destroy$),
    ).subscribe(isEditMode => {
      this.elementRef.nativeElement.style.display = isEditMode ? 'inherit' : 'none';
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
