import { MainService } from 'src/app/common/services/main.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceModel } from '../../../../common/models/place.model';
import { Component, OnInit, NgZone, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map-places',
  templateUrl: './map-places.component.html',
  styleUrls: ['./map-places.component.scss']
})
export class MapPlacesComponent implements OnInit {

  @ViewChild('agmMap') agmMap: AgmMap;
  Geocoder: any;

  @Input('Places') MyPlaces: PlaceModel[] = [];

  @Output('OnSelectItem') onSelectItem = new EventEmitter<PlaceModel>();

  MyPostition = {lat: 0, lng: 0};

  AllPlaces: PlaceModel[] = [];
  isCenterChanged = false;

  constructor (
                protected mapsAPILoader: MapsAPILoader,
                protected _sanitizer: DomSanitizer,
                protected ngZone: NgZone,
                private service: MainService) {}


  ngOnInit() {
    this.InitGoogle();
    this.GetMyPosition();

    this.GetSelectedPlaces();
    this.service.onPlacesChange$.subscribe(
      (res) => {
        this.GetSelectedPlaces();
      }
    );

  }

  GetSelectedPlaces () {
    for (let my of this.MyPlaces) {
      my.selected = false;
    }
    for (let all of this.AllPlaces) {
      all.selected = false;
    }

    const places = this.service.GetPlaces();
    for (let item of places) {
      const indexAll = this.AllPlaces.findIndex(x => x.id === item.id);
      const indexMy = this.MyPlaces.findIndex(x => x.id === item.id);
      if (indexMy >= 0) {
        this.MyPlaces[indexMy].selected = true;
      }
      if (indexAll >= 0) {
        this.AllPlaces[indexAll].selected = true;
      }
    }
  }

  InitGoogle() {
    this.mapsAPILoader.load().then(
      () => {
        this.Geocoder = new google.maps.Geocoder();
      }
    );
  }

  onCenterChange (event) {
    for (let my of this.MyPlaces) {
      my.isShow = false;
    }
    for (let all of this.AllPlaces) {
      all.isShow = false;
    }
    if (!this.isCenterChanged) {
      this.isCenterChanged = true;
      this.service.GetAllPlaces()
        .subscribe(
          (res: PlaceModel[]) => {
            for (const place of res) {
              if (this.AllPlaces.findIndex(x => x.id === place.id) < 0) {
                 this.AllPlaces.push(place);
              }
            }
            setTimeout(() => {
              this.isCenterChanged = false;
              this.GetSelectedPlaces();
            }, 10);
          }
        );
    }
  }




  SelectInfoWindow(index: number) {
      this.onSelectItem.emit(this.MyPlaces[index]);
  }

  SelectAllInfoWindow(id: string) {
    const index = this.AllPlaces.findIndex(x => x.id === id);
    this.onSelectItem.emit(this.AllPlaces[index]);
  }


  // SERVICE

  GetMyPosition () {
    this.service.GetIPLocation().
      subscribe(
        (res) => {
          const loc = res['location'];
          this.MyPostition.lat = loc[0];
          this.MyPostition.lng = loc[1];
        }
      );
  }


  GetImageURL(id) {
    return 'http://35.204.142.44:3000/images/' + id;
  }

}
