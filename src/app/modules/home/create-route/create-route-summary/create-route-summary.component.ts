import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';
import { MainService } from 'src/app/common/services/main.service';
import { RouteModel } from 'src/app/common/models/route.model';

@Component({
  selector: 'app-create-route-summary',
  templateUrl: './create-route-summary.component.html',
  styleUrls: ['./create-route-summary.component.scss']
})
export class CreateRouteSummaryComponent implements OnInit {

  Places: PlaceModel[] = [];

  Route: RouteModel = new RouteModel();
  isImageByModel = false;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.Places = this.service.GetPlaces();

    console.log(this.Places);

    if (this.service.Route) {
      this.Route = this.service.Route;
    }
  }

  GetImageURL(id) {
    return 'http://35.204.142.44:3000/images/' + id;
  }

}
