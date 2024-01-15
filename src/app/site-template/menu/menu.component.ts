import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SiteState } from '../store/site.state';
import { Observable, Subject, interval, takeUntil, take } from 'rxjs';
import { IMenuItem } from 'src/app/shared/models/site.model';
import { SaveComponentToMove, SetPageId } from '../store/site.actions';
import { trackByIndex } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  public trackByIndex = trackByIndex;

  @Select(SiteState.menuItems)
  public menuItems$!: Observable<IMenuItem[]>;

  @Select(SiteState.isEditMode)
  public isEditMode$?: Observable<boolean>;

  private destroy$ = new Subject<void>();

  public constructor(
    private store: Store,
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setPageId(pageId: string | undefined): void {
    this.store.dispatch(new SetPageId(pageId));
  }

  public mouseover(pageId?: string): void {
    interval(1000).pipe(
      takeUntil(this.destroy$),
      take(1),
    ).subscribe(() => {
      console.log('enter');

      this.setPageId(pageId);
    })
  }

  public mouseleave(): void {
    console.log('leave')
  }
}
