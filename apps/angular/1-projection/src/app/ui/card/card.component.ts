import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemTemplateDirective } from '../../data-access/list-item-template.directive';
import { CardItem } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of list; track item.id) {
          <ng-container
            *ngTemplateOutlet="
              template;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="this.add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() customClass = '';

  @Input() list: CardItem[] | null = null;
  @ContentChild(ListItemTemplateDirective, { read: TemplateRef })
  template!: TemplateRef<{ $implicit: CardItem }>;
  @Output() add: EventEmitter<void> = new EventEmitter<void>();
}
