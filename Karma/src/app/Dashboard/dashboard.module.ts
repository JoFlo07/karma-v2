import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';
import { HeaderModule } from '../header/header.module';

import { ActionComponent } from '../dashboard/components/action/action.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderModule,
    RouterModule.forChild([{ path: '', component: DashboardPage }])
  ],
  declarations: [
    DashboardPage,
    ActionComponent,
  ]
})
export class DashboardPageModule {}
