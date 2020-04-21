import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Action, User } from '../types/interfaces';
import { Plugins } from '@capacitor/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const { Storage } = Plugins;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  actions: Action[];
  filteredActions: Action[];
  user: User;

  constructor(private client: DashboardService) {}

  ngOnInit() {
    this.loadActions();
    from(Storage.get({ key: 'user'}))
      .pipe(
        switchMap((user) => this.client.getUser(user.value))
      )
      .subscribe((user) => {
        this.user = user;
      });
  }

  loadActions(): void {
    this.client.fetchActions()
      .subscribe((actions) => {
        this.actions = actions;
        this.filteredActions = actions;
      });
  }

  filterActions(input: string): Action[] {
    const regex = new RegExp(input, 'ig');
    return this.actions.filter(action => regex.test(action.action));
  }

  onChange(event): void {
    this.filteredActions = this.filterActions(event.target.value);
  }
}
