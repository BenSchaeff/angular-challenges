import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { initializeApp } from './app.actions';
import { selectActivities } from './store/activity/activity.selectors';
import { selectStatuses } from './store/status/status.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  template: `
    <h1>Activity Board</h1>
    <section>
      <div class="card" *ngFor="let activity of activitiesWithTeachers()">
        <h2>Activity Name: {{ activity.name }}</h2>
        <p>Main teacher: {{ activity.teacher.name }}</p>
        <span>All teachers available for : {{ activity.type }} are</span>
        <ul>
          <li *ngFor="let teacher of activity.teachers">
            {{ teacher.name }}
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 2px;
      }

      .card {
        display: flex;
        flex-direction: column;
        border: solid;
        border-width: 1px;
        border-color: black;
        padding: 2px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  public activitiesWithTeachersSelectors = createSelector(
    selectActivities,
    selectStatuses,
    (activities, statuses) => {
      return activities.map((a) => ({
        ...a,
        teachers: statuses.find((s) => s.name === a.type)?.teachers,
      }));
    },
  );
  public activitiesWithTeachers = this.store.selectSignal(
    this.activitiesWithTeachersSelectors,
  );

  ngOnInit(): void {
    this.store.dispatch(initializeApp());
  }
}
