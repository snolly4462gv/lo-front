import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/common/services/main.service';
import { PlaceModel, WorkTimeDNModel } from 'src/app/common/models/place.model';

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

  EstimatedTime = {
    time: 0,
    period: 'hour'
  };
  WorkTimes: WorkTimeDNModel[] = [];

  constructor(private service: MainService, private router: Router, private route: ActivatedRoute) {
     route.params.subscribe(
       params => {
         if (params['id']) {
           this.service.GetRouteById(params['id'])
            .subscribe(
              (res) => {
                this.service.SetRoute(res);
                let places = res['places'];
                for(let i=0; i<places.length; i++) {
                  places[i].selected = true;
                  places[i].order = i+1;
                }
                this.service.SetPlaces(places);
                this.router.navigate(['/home', 'create-route', 'places']);
              }
            );
         }
       }
      );
  }

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
    this.converTimeByModel();
    console.log(this.SelectPlace);
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

  converTimeByModel () {
    this.EstimatedTime.time = this.SelectPlace.estimated_time;
    let data = this.EstimatedTime.time / 60;
    if (data === parseInt(data + '', 10)) {
      this.EstimatedTime.period = 'min';
      this.EstimatedTime.time = data;
    }
    data = this.EstimatedTime.time / 60;
    if (data === parseInt(data + '', 10)) {
      this.EstimatedTime.period = 'hour';
      this.EstimatedTime.time = data;
    }
    data = this.EstimatedTime.time / 24;
    if (data === parseInt(data + '', 10)) {
      this.EstimatedTime.period = 'day';
      this.EstimatedTime.time = data;
    }

    this.WorkTimes = [];
    for (const time of this.SelectPlace.work_times) {

      let open_time_full = time.open_time.split('T')[1].split(':');
      let close_time_full = time.close_time.split('T')[1].split(':');

      let open_time_dn = 'am';
      let close_time_dn = 'am';



      if (+open_time_full[0] > 12) {
        open_time_full[0] = (+open_time_full[0] - 12) + '';
        open_time_dn = 'pm';
      }

      if (+close_time_full[0] > 12) {
        close_time_full[0] = (+close_time_full[0] - 12) + '';
        close_time_dn = 'pm';
      }

      let open_time = (open_time_full[0].length === 1 ? '0' + open_time_full[0] : open_time_full[0]) + ':' + open_time_full[1];
      let close_time = (close_time_full[0].length === 1 ? '0' + close_time_full[0] : close_time_full[0]) + ':' + close_time_full[1];

      this.WorkTimes.push(
        {
          day: time.day,
          open_time,
          open_time_dn,
          close_time,
          close_time_dn
        }
      );
    }
  }
}
