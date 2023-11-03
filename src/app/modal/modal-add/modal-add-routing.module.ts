import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddPage } from './modal-add.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddPageRoutingModule {}
