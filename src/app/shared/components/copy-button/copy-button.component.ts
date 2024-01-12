import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent {
  @Input()
  public clickAction!: () => void;

  @Input()
  public text!: string;

  @Input()
  public tooltip?: string;
}
