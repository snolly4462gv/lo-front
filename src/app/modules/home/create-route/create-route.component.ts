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
    this.CurrentPage += 1;
// tslint:disable-next-line: max-line-length
    this.router.navigate(['/home', 'create-route', Object.keys(this.Pages).find(key => this.Pages[key] === this.CurrentPage).toLowerCase()]);
  }

  ngOnInit() {
   this.service.onPlacesChange$.subscribe(
     (res) => {
      if (res) {
        this.Places = this.service.GetPlaces();
      }
     }
   );
  }



}
