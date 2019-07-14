import { TypeService } from './../../../common/services/type.service';
import { RouteModel } from 'src/app/common/models/route.model';
import { MainService } from './../../../common/services/main.service';
import { Component, ComponentFactory, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PlaceModel } from 'src/app/common/models/place.model';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.scss']
})
export class CreateRouteComponent implements OnInit {

  Pages = {
    'Index': 0,
    'Places': 1,
    'Order': 2,
    'General': 3,
    'Summary': 4
  };
  CurrentPage = this.Pages['Index'];

  Places: PlaceModel[] = [];
  Route: RouteModel = new RouteModel();

  TotalDistance = 0;
  TotalTime = 0;
  isLoading = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: MainService, private typeService: TypeService) {
    this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
            const currentRoute = this.router.url;
            if (currentRoute === '/home/create-route/index') {
              this.CurrentPage = this.Pages['Index'];
            }
            if (currentRoute === '/home/create-route/places') {
              this.CurrentPage = this.Pages['Places'];
            }
            if (currentRoute === '/home/create-route/order') {
              this.CurrentPage = this.Pages['Order'];
            }
            if (currentRoute === '/home/create-route/general') {
              this.CurrentPage = this.Pages['General'];
            }
            if (currentRoute === '/home/create-route/summary') {
              this.CurrentPage = this.Pages['Summary'];
            }
        }
    });
  }

  nextStep() {
    this.Route = this.service.Route;

    if (this.Places.length === 0) {
      this.router.navigate(['/home', 'create-route', 'places']);
      return;
    }
    if (this.Places.filter(x => x.order == null).length > 0) {
      this.router.navigate(['/home', 'create-route', 'order']);
      return;
    }
    if (!this.Route.name || !this.Route.price) {
      this.router.navigate(['/home', 'create-route', 'general']);
      return;
    }
    this.CurrentPage += 1;
    this.router.navigate(['/home', 'create-route', Object.keys(this.Pages).find(key => this.Pages[key] === this.CurrentPage).toLowerCase()]);
  }

  ngOnInit() {
   this.Places = this.service.GetPlaces();
   this.service.onPlacesChange$.subscribe(
     (res) => {
      if (res) {
        this.Places = this.service.GetPlaces();
      }
     }
   );
  }

  SaveRoute (isPublish = false) {
      // this.isLoading = true;
      this.Route = this.service.GetRoute();
      this.Route.places = [];
      for (const item of this.Places) {
        this.Route.places.push(item.id);
      }
      this.Route.total_places = this.Route.places.length;
      this.service.CreateRoute(this.Route)
      .subscribe(
        (res) => {
          // this.isLoading = false;
          this.router.navigate(['/home', 'create-route', 'index']);
          // return;
        },
        (err) => {
          // this.isLoading = false;
        }
      );
  }

  CreateRouteNav() {
    this.service.Route = new RouteModel();
    this.service.Places = [];
    this.router.navigate(['/home', 'create-route', 'index']);
  }




}
