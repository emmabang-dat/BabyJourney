import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordModalPage } from './forgot-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordModalPageRoutingModule {}
