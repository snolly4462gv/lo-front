import { Component, OnInit } from '@angular/core';
import { PlaceMapModel } from 'src/app/common/models/place-map.model';
import { MainService } from 'src/app/common/services/main.service';
import { PlaceModel } from 'src/app/common/models/place.model';

@Component({
  selector: 'app-create-route-places',
  templateUrl: './create-route-places.component.html',
  styleUrls: ['./create-route-places.component.scss']
})
export class CreateRoutePlacesComponent implements OnInit {

  Places: PlaceMapModel[] = [];
  SelectPlace: PlaceModel = new PlaceModel();

  constructor(private service: MainService) { }

  ngOnInit() {
    this.GetPlaces();
  }

  GetPlaces() {
    this.service.GetMyPlaces()
      .subscribe(
        (res: PlaceMapModel[]) => {
          this.Places = res;
        }
      );
  }

  onSelectItemInMap(event) {

    this.SelectPlace = event;
    console.log(`event`, this.SelectPlace);
  }
}
