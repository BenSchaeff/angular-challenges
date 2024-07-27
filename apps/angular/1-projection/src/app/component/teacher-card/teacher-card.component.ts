import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { ListItemTemplateDirective } from '../../data-access/list-item-template.directive';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers" (add)="add()" customClass="bg-light-red">
      <img src="assets/img/teacher.png" />
      <ng-template let-item list-item-template>
        <app-list-item
          [name]="item.firstName"
          (remove)="remove(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemTemplateDirective],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  add() {
    this.store.addOne(randTeacher());
  }
  remove(id: number) {
    this.store.deleteOne(id);
  }
}
