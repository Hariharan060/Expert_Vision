import { HomeComponent } from './Home/Home.component';
import { HelpComponent } from './Help/Help.component';
import { ContactComponent } from './Contact/Contact.component';
import { AboutComponent } from './About/About.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHomeComponent } from './LoginHome/LoginHome.component';
import { PageNotComponent } from './PageNot/PageNot.component';
import { AuthGuard } from './Shared/guards/auth.guard';
import { ProfileComponent } from './Profile/Profile.component';
import { AdminHomeComponent } from './AdminHome/AdminHome.component';
import { NewPostComponent } from './NewPost/NewPost.component';

const routes: Routes = [
{ path:'LoginHome',
component:LoginHomeComponent,
canActivate:[AuthGuard]},

  { path:'login',
  component:LoginComponent,
},

  {path:'profile',
  component:ProfileComponent},

 {path:'Home',
 component:HomeComponent},

  { path:'SignUp',
  component:SignUpComponent},

  { path:'About',
  component:AboutComponent,
  canActivate:[AuthGuard]},

  { path:'Contact',
  component:ContactComponent,
   canActivate:[AuthGuard]},

  { path:'Help',
  component:HelpComponent,
  canActivate:[AuthGuard]},

  {path:'AdminHome',
  component:AdminHomeComponent},

  {path:'NewPost',
  component:NewPostComponent},

  { path:'',
  redirectTo:'/Home',
  pathMatch:'full'},

  {path:'**',
  component:PageNotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ LoginComponent,
  HomeComponent,
  SignUpComponent,
  ContactComponent,
  HelpComponent,
  AboutComponent,
  LoginHomeComponent,PageNotComponent]
