import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetSite } from '../site-template/store/site.actions';
import { SiteState } from '../site-template/store/site.state';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {
  constructor(
    private store: Store,
  ) {
    this.store.dispatch(new GetSite());
  }

  public getsite(): any {
    console.log(this.store.selectSnapshot(SiteState.site));
  }
}
