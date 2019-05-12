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

  constructor(private router: Router, private route: ActivatedRoute, private service: MainService) {
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
        this.getTimeDistance();
      }
     }
   );
  }

  getTimeDistance () {
    if (this.Places.length >= 2) {
      this.TotalDistance = 0;

      for (let i=0; i<this.Places.length-1; i++) {
        let lat = Math.abs(this.Places[i].lat - this.Places[i+1].lat) /  0.009;
        let lng = Math.abs(this.Places[i].lng - this.Places[i+1].lng) * Math.cos(lat) /  0.008;
        let distance = Math.sqrt(lat*lat + lng*lng);
        this.TotalDistance += distance;
      }

      this.TotalTime = (this.TotalDistance * 1000 / 0.75) + this.Places.length * 300;

      this.TotalDistance = Math.round(this.TotalDistance);

      this.TotalTime = Math.ceil(this.TotalTime / 360);
    } else {
      this.TotalDistance = 0;
      this.TotalTime = 0;
    }
  }

  SaveRoute (isPublish = false) {
      this.isLoading = true;
      this.Route = this.service.GetRoute();
      this.Route.places = [];
      for (const item of this.Places) {
        this.Route.places.push(item.id);
      }

      if (this.Route.price) {
        this.Route.price *= 100;
      }

      this.Route.categories = [];

      this.Route.finished = isPublish;
        console.log(`this.Route`, this.Route);
      if (this.Route.id) {
        console.log(`update`);
        this.service.UpdateRoute(this.Route)
        .subscribe(
          (res) => {
            this.router.navigate(['/home', 'create-route']);
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );

      } else {
       console.log(`create`);
        this.service.CreateRoute(this.Route)
        .subscribe(
          (res) => {
            this.router.navigate(['/home', 'create-route']);
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );
      }
  }

  CreateRouteNav() {
    this.service.Route = new RouteModel();
    this.service.Places = [];
    this.router.navigate(['/home', 'create-route', 'index']);
  }




}
