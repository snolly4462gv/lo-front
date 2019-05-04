import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/common/services/main.service';
import { PlaceModel } from 'src/app/common/models/place.model';

@Component({
  selector: 'app-create-route-places',
  templateUrl: './create-route-places.component.html',
  styleUrls: ['./create-route-places.component.scss']
})
export class CreateRoutePlacesComponent implements OnInit {

  CurrentPage = 'SelectPlace';
  Places: PlaceModel[] = [];
  SelectPlace: PlaceModel = new PlaceModel();
  isSelectedPlaceInTheRoute = false;

  PlacesInRoute: PlaceModel[] = [];

  constructor(private service: MainService) { }

  ngOnInit() {
    this.GetPlaces();
  }

  GetPlaces() {
    this.service.GetMyPlaces()
      .subscribe(
        (res: PlaceModel[]) => {
          this.Places = res;
        }
      );

      this.PlacesInRoute = this.service.GetPlaces();
  }

  onSelectItemInMap(event) {
    this.CurrentPage = 'SelectPlace';
    this.SelectPlace = event;
    for (const item of this.PlacesInRoute) {
      if (item.id === this.SelectPlace.id) {
        this.isSelectedPlaceInTheRoute = true;
        break;
      }
      this.isSelectedPlaceInTheRoute = false;
    }
  }

  AddRouteToList() {
    if (!this.isSelectedPlaceInTheRoute) {
      this.PlacesInRoute.push(this.SelectPlace);
      this.isSelectedPlaceInTheRoute = true;
      this.CurrentPage = 'ViewPlaces';
      this.service.SetPlaces(this.PlacesInRoute);
    }
  }
  DeleteFromRoute(id) {
    let index = -1;
    for (let i = 0; i < this.PlacesInRoute.length; i++) {
      if ( this.PlacesInRoute[i].id === id) {
        index = i;
        break;
      }
    }
    if ( index >= 0) {
      if (this.PlacesInRoute[index].id === this.SelectPlace.id) {
        this.isSelectedPlaceInTheRoute = false;
      }
      this.PlacesInRoute.splice(index, 1);
    }
    this.service.SetPlaces(this.PlacesInRoute);
  }
}
