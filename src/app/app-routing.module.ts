import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ToastService } from '../services/toast.service';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['intro']);

const redirectLoggedInToTabs = () =>  redirectLoggedInTo(['tabs']);

const routes: Routes = [
  {
    path: '',

    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToTabs)
  },
  {
    path: 'signup',

    loadChildren: () => import('./account/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./account/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    
  },
  {
    path: 'forgot-password-modal',
    loadChildren: () => import('./account/forgot-password-modal/forgot-password-modal.module').then( m => m.ForgotPasswordModalPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./account/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./timeline/timeline.module').then( m => m.TimelinePageModule)
  },
  {
    path: 'modal-overview',
    loadChildren: () => import('./modal/modal-overview/modal-overview.module').then( m => m.ModalOverviewPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
