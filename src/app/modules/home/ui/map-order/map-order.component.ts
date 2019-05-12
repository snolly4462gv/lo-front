import { MainService } from 'src/app/common/services/main.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceModel } from '../../../../common/models/place.model';
import { Component, OnInit, NgZone, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map-order',
  templateUrl: './map-order.component.html',
  styleUrls: ['./map-order.component.scss']
})
export class MapOrderComponent implements OnInit {

  @ViewChild('agmMap') agmMap: AgmMap;
  Geocoder: any;

  @Input('Places') MyPlaces: PlaceModel[] = [];

  @Output('OnSelectOrder') onSelectOrder = new EventEmitter<PlaceModel[]>();

  MyPostition = {lat: 0, lng: 0};

  AllPlaces: PlaceModel[] = [];
  Polylines = [];
  RouteOrder: PlaceModel[] = [];
  StartId = '';

  constructor (
                protected mapsAPILoader: MapsAPILoader,
                protected _sanitizer: DomSanitizer,
                protected ngZone: NgZone,
                private service: MainService) {}


  ngOnInit() {
    this.InitGoogle();
    this.GetMyPosition();

      for (let item of this.MyPlaces) {
        item.selected = false;
      }
      const places = this.service.GetPlaces();
      const countNotOrdered = places.filter(x => x.order == null).length;
      if (countNotOrdered === 0) {
        this.RouteOrder = places;
        this.DrawLines(this.RouteOrder);
        if (this.MyPlaces[0]) {
          this.MyPlaces[0].selected = true;
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



  SelectInfoWindow(index: number) {
      this.MyPlaces[index].selected = true;

      const copyPoints = this.MyPlaces;


      this.MyPlaces = [];
      setTimeout(() => {
        this.MyPlaces = copyPoints;

      let isInOrder = false;
      for (const item of this.RouteOrder) {
        if (item.id === this.MyPlaces[index].id) {
          isInOrder = true;
          break;
        }
      }
      if (!isInOrder) {
        this.MyPlaces[index].order = this.RouteOrder.length + 1;
        this.RouteOrder.push(this.MyPlaces[index]);
      }


      this.onSelectOrder.emit(this.RouteOrder);




      this.DrawLines(this.RouteOrder);
      }, 15);
  }


  DrawLines(places: PlaceModel[]) {
    this.RouteOrder = places;
    if (places.length >= 2) {
      this.Polylines = [];
      for (let i = 0; i < places.length - 1; i++) {
        // if(places[i].order && places[i+1].order){
          let Point1 = {lat: places[i].lat, lng: places[i].lng};
          let Point2 = {lat: places[i + 1].lat, lng: places[i + 1].lng};
          this.GmapsCubicBezier(Point1, Point2, 0.025);
        // }
      }
    }
  }




  StartOver () {
    for (let item of this.MyPlaces) {
      item.selected = false;
      item.order = null;
    }
    const copyPoints = this.MyPlaces;
    this.MyPlaces = [];
    this.RouteOrder = [];
    this.Polylines = [];
    setTimeout(() => {
      this.MyPlaces = copyPoints;
      this.onSelectOrder.emit(this.RouteOrder);
    }, 15);
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






  // BEZIER

  GmapsCubicBezier(Point1, Point2, resolution) {
    const lat1 = Point1.lat;
    const long1 = Point1.lng;
    const lat2 = Point2.lat;
    const long2 = Point2.lng;

    const lat3 = this.getMin(Point1.lat, Point2.lat)  + 0.33 * Math.abs(Point1.lat - Point2.lat) + Math.abs(Point1.lat - Point2.lat)*0.15;
    const long3 = this.getMin(Point1.lng, Point2.lng) + 0.33 * Math.abs(Point1.lng - Point2.lng);
    const lat4 = this.getMin(Point1.lat, Point2.lat) + 0.66 * Math.abs(Point1.lat - Point2.lat) + Math.abs(Point1.lat - Point2.lat)*0.15;
    const long4 = this.getMin(Point1.lng, Point2.lng) + 0.66 * Math.abs(Point1.lng - Point2.lng);


    const points = [];

    for (let it = 0; it <= 1; it += resolution) {
        points.push(this.getBezier({
            x: lat1,
            y: long1
        }, {
            x: lat3,
            y: long3
        }, {
            x: lat4,
            y: long4
        }, {
            x: lat2,
            y: long2
        },  it));
    }


    for (let i = 0; i < points.length - 2; i += 2) {
        this.Polylines.push(
        {
          start: {x: points[i].x, y: points[i].y},
          end: {x: points[i + 1].x, y: points[i + 1].y}
        });
    }
  }

  B1 = function (t) {
      return t * t * t;
  };
  B2 = function (t) {
      return 3 * t * t * (1 - t);
  };
  B3 = function (t) {
      return 3 * t * (1 - t) * (1 - t);
  };
  B4 = function (t) {
      return (1 - t) * (1 - t) * (1 - t);
  };
  getMin = function (val1, val2) {
    if (val1 < val2) { return val1; }
    return val2;
  };
  getBezier = function (C1, C2, C3, C4, percent) {
      const pos = {x: 0, y: 0};
      pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
      pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
      return pos;
  };

}
