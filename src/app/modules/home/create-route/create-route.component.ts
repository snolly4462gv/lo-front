import { Component, ComponentFactory } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.scss']
})
export class CreateRouteComponent {

  Pages = {
    'Index': 0,
    'Places': 1,
    'Order': 2,
    'General': 3,
    'Summary': 4
  };
  CurrentPage = this.Pages['Index'];

  constructor(private router: Router, private route: ActivatedRoute ) {
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
}
