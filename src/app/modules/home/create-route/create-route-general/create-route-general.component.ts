import { MainService } from './../../../../common/services/main.service';
import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';

@Component({
  selector: 'app-create-route-general',
  templateUrl: './create-route-general.component.html',
  styleUrls: ['./create-route-general.component.scss']
})
export class CreateRouteGeneralComponent implements OnInit {
  tags = ['Tag1', 'Tag2'];

  Places: PlaceModel[] = [];

  constructor(private service: MainService) { }

  ngOnInit() {
    this.Places = this.service.GetPlaces();
  }

}
