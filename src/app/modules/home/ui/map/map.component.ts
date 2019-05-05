import { MainService } from 'src/app/common/services/main.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceModel } from './../../../../common/models/place.model';
import { Component, OnInit, NgZone, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  Modes = {
    'OnlyMap': 0,
    'AddPlace': 1,
    'SelectPlaces': 2,
    'CreateRoute': 3,
    'General': 4
  };

  @Input() Mode = this.Modes.OnlyMap;
  @Input() Places: PlaceModel[] = [];

  @Output('OnSelectAddress') onSelectAddress = new EventEmitter<{lat: number, lng: number, address:string}>();
  @Output('OnSelectItem') onSelectItem = new EventEmitter<PlaceModel>();
  @Output('OnSelectOrder') onSelectOrder = new EventEmitter<PlaceModel[]>();

  constructor (
                protected mapsAPILoader: MapsAPILoader,
                protected _sanitizer: DomSanitizer,
                protected ngZone: NgZone,
                private service: MainService) {}

  @ViewChild('agmMap') agmMap: AgmMap;

  lat = 49.678418;
  lng = 37.809007;

  Geocoder: any;
  // Point1 = {lat: this.lat, lng: this.lng, selected: false};
  // Point2 = {lat: this.lat + 1, lng: this.lng + 5};



  Polylines = [];

  RouteOrder: PlaceModel[] = [];
  StartId = '';

  @Input() NewPlace: PlaceModel = new PlaceModel();


  ngOnInit() {
    this.InitGoogle();

    if (this.Mode === this.Modes.CreateRoute || this.Mode === this.Modes.General){
      for (let item of this.Places) {
        item.selected = false;
      }
      if (this.Mode === this.Modes.General) {
        this.Places[0].selected = true;
      }
      const places = this.service.GetPlaces();
      const countNotOrdered = places.filter(x => x.order == null).length;
      if (countNotOrdered === 0) {
        this.RouteOrder = places;
        this.DrawLines(this.RouteOrder);
        if (this.Mode === this.Modes.CreateRoute) {
          this.Places[0].selected = true;
        }
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

  MapClick(event: any) {
    if (this.Mode === this.Modes.AddPlace) {
      this.NewPlace.lat = event.coords.lat;
      this.NewPlace.lng = event.coords.lng;
      console.log(this.NewPlace);
      this.getAddressByPostion(this.NewPlace.lat, this.NewPlace.lng,
      (res) => {
        this.onSelectAddress.emit(
        {
          address: res,
          lat: this.NewPlace.lat,
          lng: this.NewPlace.lng
        });
      });
    }
  }

  getAddressByPostion(lat: number, lng: number, callback: (res) => void) {
    let address = 'Address';
    let latlng = new google.maps.LatLng(lat, lng);
    this.Geocoder.geocode({
        'location': latlng },
        (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                address = results[1].formatted_address;
                } else {
                // alert('No results found');
                }
            } else {
                // alert('Geocoder failed due to: ' + status);
            }
            callback(address);
        });
  }

  SelectInfoWindow(index: number) {
    if (this.Mode === this.Modes.SelectPlaces) {
      for (let item of this.Places) {
        item.selected = false;
      }
      this.Places[index].selected = !this.Places[index].selected;
      const copyPoints = this.Places;
      this.onSelectItem.emit(this.Places[index]);
      this.Places = [];
      setTimeout(() => {
        this.Places = copyPoints;
      }, 15);
    } else if (this.Mode === this.Modes.CreateRoute) {
      this.Places[index].selected = true;

      const copyPoints = this.Places;


      this.Places = [];
      setTimeout(() => {
        this.Places = copyPoints;




      let isInOrder = false;
      for (const item of this.RouteOrder) {
        if (item.id === this.Places[index].id) {
          isInOrder = true;
          break;
        }
      }
      if (!isInOrder) {
        this.Places[index].order = this.RouteOrder.length + 1;
        this.RouteOrder.push(this.Places[index]);
      }


      this.onSelectOrder.emit(this.RouteOrder);




      this.DrawLines(this.RouteOrder);
      }, 15);
    }
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

    GetImageURL(id) {
      return 'http://35.204.142.44:3000/images/' + id;
    }

    StartOver () {
      for (let item of this.Places) {
        item.selected = false;
        item.order = null;
      }
      const copyPoints = this.Places;
      this.Places = [];
      this.RouteOrder = [];
      this.Polylines = [];
      setTimeout(() => {
        this.Places = copyPoints;
        this.onSelectOrder.emit(this.RouteOrder);
      }, 15);
    }

}
