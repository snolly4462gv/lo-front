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
  };

  @Input() Mode = this.Modes.OnlyMap;

  @Output('OnSelectAddress') onSelectAddress = new EventEmitter<{lat: number, lng: number, address:string}>()

  constructor (protected mapsAPILoader  : MapsAPILoader,
  protected _sanitizer     : DomSanitizer,
  protected ngZone         : NgZone,) {}

  @ViewChild('agmMap') agmMap: AgmMap;

  lat = 51.678418;
  lng = 7.809007;
  Point1 = {lat: this.lat, lng: this.lng, selected: false};
  Point2 = {lat: this.lat + 1, lng: this.lng + 5};

  Points = [];

  Polylines = [];

  NewPlace: PlaceModel = new PlaceModel();

  ngOnInit() {
      this.Points.push(this.Point1);
      this.Points.push(this.Point2);
      this.GmapsCubicBezier(this.Point1, this.Point2, 0.025);
  }

  MapClick(event: any) {
    if (this.Mode === this.Modes.AddPlace) {
      this.NewPlace.lat = event.coords.lat;
      this.NewPlace.lng = event.coords.lng;
      this.onSelectAddress.emit(
        {
          address: this.getAddressByPostion(this.NewPlace.lat, this.NewPlace.lng),
          lat: this.NewPlace.lat,
          lng: this.NewPlace.lng
        });
    }
  }

  getAddressByPostion(lat:number, lng:number) {
    let address = 'Address';

    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
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
        });
    return address;
  }

  SelectInfoWindow(index: number) {
    if (this.Mode === this.Modes.SelectPlaces) {
      this.Points[index].selected = !this.Points[index].selected;
      const copyPoints = this.Points;
      this.Points = [];
      setTimeout(() => {
        this.Points = copyPoints;
      }, 5);
    }
    else if (this.Mode === this.Modes.CreateRoute) {
      this.Points[index].selected = !this.Points[index].selected;
      const copyPoints = this.Points;
      this.Points = [];
      setTimeout(() => {
        this.Points = copyPoints;
      }, 5);
    }
  }


  GmapsCubicBezier(Point1, Point2, resolution) {
    const lat1 = Point1.lat;
    const long1 = Point1.lng;
    const lat2 = Point2.lat;
    const long2 = Point2.lng;

    const lat3 = this.getMin(this.Point1.lat, this.Point2.lat)  + 0.33 * Math.abs(this.Point1.lat - this.Point2.lat) + Math.abs(this.Point1.lat - this.Point2.lat)*0.15;
    const long3 = this.getMin(this.Point1.lng, this.Point2.lng) + 0.33 * Math.abs(this.Point1.lng - this.Point2.lng);
    const lat4 = this.getMin(this.Point1.lat, this.Point2.lat) + 0.66 * Math.abs(this.Point1.lat - this.Point2.lat) + Math.abs(this.Point1.lat - this.Point2.lat)*0.15;
    const long4 = this.getMin(this.Point1.lng, this.Point2.lng) + 0.66 * Math.abs(this.Point1.lng - this.Point2.lng);


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

    this.Polylines = [];
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
