import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { ListItemTemplateDirective } from '../../data-access/list-item-template.directive';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card (add)="add()" [list]="cities" customClass="bg-light-blue">
      <img src="assets/img/city.png" />
      <ng-template let-item list-item-template>
        <app-list-item
          [name]="item.name"
          (remove)="remove(item.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.3);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, ListItemTemplateDirective],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  add() {
    this.store.addOne(randomCity());
  }
  remove(id: number) {
    this.store.deleteOne(id);
  }
}
