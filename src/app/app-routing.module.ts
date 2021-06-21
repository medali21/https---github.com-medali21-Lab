import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';
import { ArticleAffectComponent } from './article-affect/article-affect.component';
import { ArticlesComponent } from './articles/articles.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { EventsComponent } from './events/events.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ToolsListComponent } from './tools-list/tools-list.component';
import { ToolsComponent } from './tools/tools.component';
import { EventsFormComponent } from './events-form/events-form.component';
import { ArticleFormComponent } from './article-form/article-form.component';

const routes: Routes = [
  { path: '',
  pathMatch:'full',
  redirectTo : 'dashboard'
 },
 {
  path: "members/:id/edit",
  pathMatch: 'full',
  canActivate: [AuthGuard],
  component :  MemberFormComponent,
},

  { path: 'tools/:id/edit1',
  pathMatch:'full',
  canActivate: [AuthGuard],
  component: ToolsComponent
 },
 { path: 'events/:id/edit1',
  pathMatch:'full',
  canActivate: [AuthGuard],
  component: EventsFormComponent
 },
  { path: 'add',
  pathMatch:'full',
  canActivate: [AuthGuard],
  component: MemberFormComponent
 },
 { path: 'add1',
 pathMatch:'full',
 canActivate: [AuthGuard],
 component: ToolsComponent
},
{ path: 'add2',
pathMatch:'full',
canActivate: [AuthGuard],
component: EventsFormComponent
},

{ path: 'add3',
pathMatch:'full',
canActivate: [AuthGuard],
component: ArticleFormComponent
},

 { path: 'members',
  pathMatch:'full',
  canActivate: [AuthGuard],
  component: MemberListComponent
 },
 { path: 'dashboard',
  pathMatch:'full',
  canActivate: [AuthGuard],
  component: DashbordComponent
 },
 { path: 'tools', 
  pathMatch:'full',
  canActivate: [AuthGuard],
  component: ToolsListComponent
 },
 {    path:'articles/:id/edit',
      pathMatch:'full',
      canActivate: [AuthGuard],
      component: ArticleFormComponent
    },
 {    path:'articles/:id/affect',
      pathMatch:'full',
      canActivate: [AuthGuard],

      component: ArticleAffectComponent
    },
    {path:'articles',
    pathMatch:'full',
    component: ArticlesComponent
    },
 { path: 'events',
  pathMatch:'full',
  canActivate: [AuthGuard],
  component: EventsComponent
 },

 { path: 'login',
  pathMatch:'full',
  component: LoginComponent 
 },
 { path: 'logout',
  pathMatch:'full',
  component: LayoutComponent 
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
 
