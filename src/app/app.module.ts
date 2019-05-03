import { RoutesIndexComponent } from './modules/home/routes/routes-index/routes-index.component';
import { PlacesComponent } from './modules/home/places/places.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthComponent } from './modules/auth/auth.component';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardIndexComponent } from './modules/home/dashboard/dashboard-index/dashboard-index.component';
import { CreateRouteComponent } from './modules/home/create-route/create-route.component';
import { CreateRouteIndexComponent } from './modules/home/create-route/create-route-index/create-route-index.component';
import { NavComponent } from './modules/home/ui/nav/nav.component';
import { SideComponent } from './modules/home/ui/side/side.component';
import { CreateRoutePlacesComponent } from './modules/home/create-route/create-route-places/create-route-places.component';
import { CreateRouteOrderComponent } from './modules/home/create-route/create-route-order/create-route-order.component';
import { CreateRouteGeneralComponent } from './modules/home/create-route/create-route-general/create-route-general.component';
import { CreateRouteSummaryComponent } from './modules/home/create-route/create-route-summary/create-route-summary.component';
import { PlacesIndexComponent } from './modules/home/places/places-index/places-index.component';
import { RoutesComponent } from './modules/home/routes/routes.component';
import { PlacesCreateComponent } from './modules/home/places/places-create/places-create.component';
import { MapComponent } from './modules/home/ui/map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    DashboardIndexComponent,
    CreateRouteComponent,
    CreateRouteIndexComponent,
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    NavComponent,
    SideComponent,
    CreateRoutePlacesComponent,
    CreateRouteOrderComponent,
    CreateRouteGeneralComponent,
    CreateRouteSummaryComponent,
    PlacesComponent,
    PlacesIndexComponent,
    RoutesComponent,
    RoutesIndexComponent,
    PlacesCreateComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyDY0-Eh_aXzIaR7q-wYWOLaSZcr6VRUMkM'
      apiKey: 'AIzaSyDNxl1cQw-cqFs5sv0vGJYmW_Ew5qWKNCc'

            // apiKey: 'AIzaSyBaq3qTokKJ_b2VP0h5h_eeYliQ80ME74M',
      // libraries: ["places"]
    }),
    DndModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
