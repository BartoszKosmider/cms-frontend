import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IMenuItem } from 'src/app/shared/models/site.model';
import { trackByIndex } from 'src/app/shared/models/app.model';
import { SiteState } from 'src/app/site-template/store/site.state';
import * as _ from 'lodash';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public trackByIndex = trackByIndex;
  public mainPage$!: Observable<IMenuItem | undefined>;

  @Select(SiteState.pageId)
  public pageId$!: Observable<string | undefined>;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.pageId$.subscribe(pageId => {
      if (!_.isNil(pageId)) {
        this.mainPage$ = this.store.select(SiteState.mainPage(pageId));
      }
    })
  }
}
