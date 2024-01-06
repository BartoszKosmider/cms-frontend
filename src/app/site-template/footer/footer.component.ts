import { Component, ElementRef, HostListener } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IFooter } from 'src/app/shared/models/site.model';
import { Observable } from 'rxjs';
import { SetComponentToEdit } from '../store/site.actions';
import { SiteState } from '../store/site.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Select(SiteState.footer)
  public footer$!: Observable<IFooter>;

  @Select(SiteState.isEditMode)
  public isEditMode$?: Observable<boolean>;

  @HostListener('document:mousedown', ['$event'])
  public onGlobalClick(event: { target: any; }): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
      this.selectedFooter = false;
     }
  }

  public selectedFooter = false;

  constructor(
    private store: Store,
    private elementRef: ElementRef,
  ) { }

  public setComponentToEdit(component: IFooter): () => void {
    return () => {
      if (this.store.selectSnapshot(SiteState.isEditMode)) {
        this.store.dispatch(new SetComponentToEdit(component));
      }
    }
  }
}
