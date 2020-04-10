import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';

import { ActionComponent } from '../dashboard/components/action/action.component';
import { HeaderComponent } from '../dashboard/components/header/header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DashboardPage }])
  ],
  declarations: [
    DashboardPage,
    ActionComponent,
    HeaderComponent,
  ]
})
export class DashboardPageModule {}
