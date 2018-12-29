import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TweetViewerComponent } from './tweet-viewer/tweet-viewer.component';
import { 
    AdminAuthGuardService as AdminAuthGuard 
  } from './services/admin-auth-guard/admin-auth-guard.service';
  import { 
    AdminLoginRedirectService as AdminLoginRedirect 
  } from './services/admin-login-redirect/admin-login-redirect.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
  

const adminRoutes = [
  {path: 'dashboard', component: TweetViewerComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
]
  
const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'admin',
        children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'}, 
          {path: 'login', component: AdminLoginComponent, canActivate:[AdminLoginRedirect]}, 
          {
            path: 'home', 
            component: AdminHomeComponent,
            canActivate: [AdminAuthGuard], 
            children: adminRoutes
          }
        ]
      },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }