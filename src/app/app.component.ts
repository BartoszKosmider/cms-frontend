import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetSite } from './site-template/store/site.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cms-projekt';
  public isLogged = true;

  constructor(private store: Store) {
    this.store.dispatch(new GetSite());
  }
}
