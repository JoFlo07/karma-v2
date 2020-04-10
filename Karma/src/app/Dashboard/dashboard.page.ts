import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Action } from '../action';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  actions: Action[];
  filteredActions: Action[];

  constructor(private client: DashboardService) {}

  ngOnInit() {
    this.loadActions();
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
