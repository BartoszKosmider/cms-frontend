import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import * as _ from 'lodash';
import { Observable, Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { DeletePage, PatchPage } from 'src/app/site-template/store/site.actions';
import { SiteState } from 'src/app/site-template/store/site.state';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrl: './page-editor.component.scss',
})
export class PageEditorComponent implements OnDestroy {
  public selectedPageId?: string;
  public mainPage$?: Observable<any>;
  public pageForm = new FormGroup({
    pageName: new FormControl(''),
  });

  @Select(SiteState.pageId)
  public pageId$?: Observable<string | undefined>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    this.pageId$?.pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      tap(pageId => this.selectedPageId = pageId)
    ).subscribe(pageId => {
      if (!_.isNil(pageId)) {
        const mainPage = this.store.selectSnapshot(SiteState.mainPage(pageId));
        this.pageForm.patchValue({
          pageName: mainPage?.title,
        });
        this.pageForm.updateValueAndValidity();
      }
    });

    this.pageForm.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$),
      distinctUntilChanged(),
    ).subscribe(form => {
      if (this.selectedPageId) {
        this.store.dispatch(new PatchPage(this.selectedPageId, <string>form.pageName));
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public deletePage: () => void = () => {
    this.store.dispatch(new DeletePage(<string>this.selectedPageId));
    this.selectedPageId = undefined;
  }
}
