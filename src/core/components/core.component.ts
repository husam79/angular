import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  template: ``,
  styleUrls: [],
})
export class CoreComponent {
  currencies = [
    { title: 'Eur', value: 1 },
    { title: 'Turk', value: 2 },
  ];
  constructor() {}
}
