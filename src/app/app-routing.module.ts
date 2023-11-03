import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./timeline/timeline.module').then( m => m.TimelinePageModule)
  },
  {
    path: 'modal-overview',
    loadChildren: () => import('./modal/modal-overview/modal-overview.module').then( m => m.ModalOverviewPageModule)
  },  {
    path: 'modal-add',
    loadChildren: () => import('./modal/modal-add/modal-add.module').then( m => m.ModalAddPageModule)
  },
  {
    path: 'overview',
    loadChildren: () => import('./modal/overview/overview.module').then( m => m.OverviewPageModule)
  },
  {
    path: 'modal-edit',
    loadChildren: () => import('./modal/modal-edit/modal-edit.module').then( m => m.ModalEditPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
