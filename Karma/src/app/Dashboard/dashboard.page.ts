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

  constructor(private client: DashboardService) {}

  ngOnInit() {
    this.loadActions();
  }

  loadActions(): void {
    this.client.fetchActions()
      .subscribe((actions) => this.actions = actions);
  }
}
