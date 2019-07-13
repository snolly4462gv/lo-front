import { RouteModel } from './../../../../common/models/route.model';
import { Router, ActivatedRoute } from '@angular/router';
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

  EstimatedTime = {
    time: 0,
    period: 'hour'
  };

  constructor(private service: MainService, private router: Router, private route: ActivatedRoute) {
     route.params.subscribe(
       params => {
         if (params['id']) {
           this.service.GetRouteById(params['id'])
            .subscribe(
              (res: RouteModel) => {
                if (res.price) {
                  res.price /= 100;
                }
                this.service.SetRoute(res);
                let places = res.places;
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
    this.service.GetAllPlaces()
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
    console.log(this.SelectPlace);
    // for (const item of this.PlacesInRoute) {
    //   if (item.id === this.SelectPlace.id) {
    //     this.isSelectedPlaceInTheRoute = true;
    //     break;
    //   }
    //   this.isSelectedPlaceInTheRoute = false;
    // }
    this.isSelectedPlaceInTheRoute = false;
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
