import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';
import { MainService } from 'src/app/common/services/main.service';
import { RouteModel } from 'src/app/common/models/route.model';
import { TypeService } from 'src/app/common/services/type.service';

@Component({
  selector: 'app-create-route-summary',
  templateUrl: './create-route-summary.component.html',
  styleUrls: ['./create-route-summary.component.scss']
})
export class CreateRouteSummaryComponent implements OnInit {

  Places: PlaceModel[] = [];

  Route: RouteModel = new RouteModel();
  isImageByModel = false;

  constructor(private service: MainService, private typeService: TypeService, private router: Router) { }

  ngOnInit() {
    this.Places = this.service.GetPlaces();
    this.Route = this.service.Route;

    if (this.Places.length === 0) {
      this.router.navigate(['/home', 'create-route', 'places']);
      return;
    }
    if (this.Places.filter(x => x.order == null).length > 0) {
      this.router.navigate(['/home', 'create-route', 'order']);
      return;
    }
    if (!this.Route.name || this.Route.price < 0 || !this.Route.price  ) {
      this.router.navigate(['/home', 'create-route', 'general']);
      return;
    }
  }

  GetImageURL(id) {
    return 'http://35.204.142.44:3000/images/' + id;
  }

}
