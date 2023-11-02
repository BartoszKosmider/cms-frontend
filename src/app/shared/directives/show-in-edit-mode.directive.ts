import { Directive, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SiteState } from 'src/app/site-template/store/site.state';
import { distinctUntilChanged, filter } from 'rxjs';
import * as _ from 'lodash';

@Directive({
  selector: '[appShowInEditMode]'
})
export class ShowInEditModeDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private store: Store,
  ) { }

  public ngOnInit(): void {
    this.store.select(SiteState.isEditMode).pipe(
      distinctUntilChanged(),
      filter(x => !_.isNil(x)),
    ).subscribe(isEditMode => {
      this.elementRef.nativeElement.style.display = isEditMode ? 'inherit' : 'none';
    });
  }
}
