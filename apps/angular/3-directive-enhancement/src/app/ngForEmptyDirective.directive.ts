import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
})
export class NgForEmptyDirective<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  //List of items
  @Input() ngForOf?: T[] = undefined;

  //tempalte to show if empty
  @Input() ngForEmpty!: TemplateRef<unknown>;

  //ref of our embeddedView of our empty template
  private ref?: EmbeddedViewRef<unknown>;

  public ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmpty);
    }
  }
}
