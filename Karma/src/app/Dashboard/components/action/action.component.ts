import { Component, Input } from '@angular/core';
import { Action } from 'src/app/types/interfaces';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent {
  @Input() action: Action;

  constructor() { }

  getCategoryIcon(category: string): string {
    const basePath = '../../../../assets/icons';
    switch (category) {
      case 'Transport':
        return basePath + '/bus.png';
      case 'Relationship':
        return basePath + '/friends.png';
      case 'Environment':
        return basePath + '/planet-earth.png';
      case 'People':
        return basePath + '/charity.png';
      case 'Volunteering':
        return basePath + '/b2b.png';
      default:
        return basePath + '/planet-earth.png';
    }
  }

}
