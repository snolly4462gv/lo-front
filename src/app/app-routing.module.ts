import { AppGuard } from './app.guard';
import { PlacesIndexComponent } from './modules/home/places/places-index/places-index.component';
import { RoutesIndexComponent } from './modules/home/routes/routes-index/routes-index.component';
import { CreateRouteSummaryComponent } from './modules/home/create-route/create-route-summary/create-route-summary.component';
import { CreateRouteGeneralComponent } from './modules/home/create-route/create-route-general/create-route-general.component';
import { CreateRouteOrderComponent } from './modules/home/create-route/create-route-order/create-route-order.component';
import { CreateRoutePlacesComponent } from './modules/home/create-route/create-route-places/create-route-places.component';
import { CreateRouteComponent } from './modules/home/create-route/create-route.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { AuthComponent } from './modules/auth/auth.component';
import { CreateRouteIndexComponent } from './modules/home/create-route/create-route-index/create-route-index.component';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardIndexComponent } from './modules/home/dashboard/dashboard-index/dashboard-index.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RoutesComponent } from './modules/home/routes/routes.component';
import { PlacesComponent } from './modules/home/places/places.component';
import { PlacesCreateComponent } from './modules/home/places/places-create/places-create.component';

const routes: Routes = [
{ path: '',  pathMatch: 'full', redirectTo: 'auth'},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AppGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: 'dashboard', component: DashboardIndexComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'index'},
          {path: 'index', component: DashboardIndexComponent},
        ]
      },
      { path: 'create-route', component: CreateRouteComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'index'},
          {path: 'index', component: CreateRouteIndexComponent},
          {path: 'places', component: CreateRoutePlacesComponent},
          {path: 'order', component: CreateRouteOrderComponent},
          {path: 'general', component: CreateRouteGeneralComponent},
          {path: 'summary', component: CreateRouteSummaryComponent},
        ]
      },
      { path: 'routes', component: RoutesComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'index'},
          {path: 'index', component: RoutesIndexComponent}
        ]
      },
      { path: 'places', component: PlacesComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'index'},
          {path: 'index', component: PlacesIndexComponent},
          {path: 'create', component: PlacesCreateComponent},
          {path: 'edit', component: PlacesCreateComponent}
        ]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AppGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login'},
      { path: 'login', component: LoginComponent},
      { path: 'sign-up', component: SignUpComponent}
    ]},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

