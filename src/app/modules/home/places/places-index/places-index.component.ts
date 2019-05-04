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
  ngOnInit() {
    this.GetPlaces();
  }

  GetPlaces() {
    this.service.GetMyPlaces()
      .subscribe(
        (res: PlaceModel[]) => {
          this.Places = res;
          console.log(this.Places);
        }
      );
  }

  GetIImageURL(id) {
    return 'http://35.204.142.44:3000/images/' + id;
  }

}
