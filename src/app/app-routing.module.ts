import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { UserSignupComponent } from './auth/user-signup/user-signup.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {
    path: 'user', children: [
      { path: '', component: UserHomeComponent },
      { path: 'login', canActivate: [AuthGuard], component: UserLoginComponent },
      { path: 'signup', canActivate: [AuthGuard], component: UserSignupComponent },
      { path: 'verify/:id/:token', component: VerifyEmailComponent }
    ]
  },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
