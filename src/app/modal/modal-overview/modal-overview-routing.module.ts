import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalOverviewPage } from './modal-overview.page';

const routes: Routes = [
  {
    path: '',
    component: ModalOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOverviewPageRoutingModule {}
