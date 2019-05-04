import { MapComponent } from './../../ui/map/map.component';
import { MainService } from './../../../../common/services/main.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';

@Component({
  selector: 'app-create-route-order',
  templateUrl: './create-route-order.component.html',
  styleUrls: ['./create-route-order.component.scss']
})
export class CreateRouteOrderComponent implements OnInit {

  Places: PlaceModel[] = [];
  isDragEnable = false;

  @ViewChild('Map') Map: MapComponent;
  constructor(private service: MainService) { }

  ngOnInit() {
    this.Places = this.service.GetPlaces();
    const countNotOrdered = this.Places.filter(x => x.order == null).length;
    if (countNotOrdered === 0 ) {
      this.isDragEnable = true;
    } else {
       this.isDragEnable = false;
    }
  }

  dropEnd() {
    const countNotOrdered = this.Places.filter(x => x.order == null).length;
    if (countNotOrdered === 0 ) {
      for (let i = 0; i < this.Places.length; i++) {
        if (this.Places[i].order) {
          this.Places[i].order = i + 1;
        }
      }
      this.Places = this.SortPlaces(this.Places);
      this.service.SetPlaces(this.Places);
      this.Map.DrawLines(this.Places);
    }
  }

  onSelectOrder () {
    this.Places = this.SortPlaces(this.Places);
    this.service.SetPlaces(this.Places);

    const countNotOrdered = this.Places.filter(x => x.order == null).length;
    if (countNotOrdered === 0 ) {
      this.isDragEnable = true;
    } else {
       this.isDragEnable = false;
    }
  }

  StartOver () {
    this.Map.StartOver();
  }

  SortPlaces(places: PlaceModel[]){
    const placesOrder = this.Places
      .filter(x => x.order)
      .sort((a, b) => {
        if (a.order < b.order || b.order == null || !b.order) {
          return -1;
        }
        return 1;
      });
    const placesNull =  this.Places.filter(x => x.order == null);
    return placesOrder.concat(placesNull);
  }

}
