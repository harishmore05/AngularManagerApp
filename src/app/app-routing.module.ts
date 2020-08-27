import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // Route login page if "" nothing is methion after server ip
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // Route to login 
  {
    path:'login',
    component: SigninComponent,
  },
  // Route to signup page
  {
    path:'register',
    component: RegisterComponent,
  },
  // Route to home page 
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // Route to page not found if url is not match with any of above
  {
    path: '**' ,
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
