import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetArticleComments, SaveArticleComment } from '../../store/article.action';
import * as moment from 'moment';
import { ArticleState } from '../../store/article.state';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { IComment, ISaveArticleComment } from 'src/app/shared/models/article.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss',
})
export class ArticleCommentsComponent implements OnInit, OnDestroy {
  public commentForm = new FormGroup({
    comment: new FormControl<string>('', [Validators.required])
  });
  public isAuthenticated = false;

  private limit = 20;
  private offset = 0;
  private destroy$ = new Subject<void>();

  @Input()
  public articleId!: number;

  @Select(ArticleState.comments)
  public comments$?: Observable<IComment[]>;

  constructor(
    private store: Store,
    private authService: AuthService,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetArticleComments(this.articleId, moment().toString(), this.limit, this.offset));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public saveComment(): void {
    if (this.commentForm.invalid) {
      return;
    }

    this.store.dispatch(new SaveArticleComment(this.articleId, <ISaveArticleComment>{
      content: this.commentForm.controls.comment.value,
    })).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.commentForm.reset();
    });
  }
}
