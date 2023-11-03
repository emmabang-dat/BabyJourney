import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditPage } from './modal-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditPageRoutingModule {}
