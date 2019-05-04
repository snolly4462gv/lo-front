import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';
import { MainService } from 'src/app/common/services/main.service';

@Component({
  selector: 'app-create-route-summary',
  templateUrl: './create-route-summary.component.html',
  styleUrls: ['./create-route-summary.component.scss']
})
export class CreateRouteSummaryComponent implements OnInit {

  Places: PlaceModel[] = [];

  constructor(private service: MainService) { }

  ngOnInit() {
    this.Places = this.service.GetPlaces();
  }

}
