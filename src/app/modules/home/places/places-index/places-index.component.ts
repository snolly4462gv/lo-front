import { MainService } from './../../../../common/services/main.service';
import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';

@Component({
  selector: 'app-places-index',
  templateUrl: './places-index.component.html',
  styleUrls: ['./places-index.component.scss']
})
export class PlacesIndexComponent implements OnInit {

  constructor(private service: MainService) { }

  Places: PlaceModel[] = [];
  isLoadingPlaces = false;
  ngOnInit() {
    this.GetPlaces();
  }

  GetPlaces() {
    this.isLoadingPlaces = true;
    this.service.GetAllPlaces()
      .subscribe(
        (res: PlaceModel[]) => {
          this.Places = res;
          console.log(this.Places);
        },
        () => {},
        () => {
          setTimeout(() => {
            this.isLoadingPlaces = false;
          }, 500);

        }
      );
  }

  GetIImageURL(id) {
    return 'http://35.204.142.44:3000/images/' + id;
  }

  RemoveItem(place) {
    console.log(place);
     this.isLoadingPlaces = true;
    this.service.DeletePlace(place.id)
        .subscribe(
          (res) => {
            this.isLoadingPlaces = false;
            this.GetPlaces();
          },
          () => {
            this.GetPlaces();
            this.isLoadingPlaces = false;
          },
          () => {
            this.isLoadingPlaces = false;
          }
        );
  }

}
