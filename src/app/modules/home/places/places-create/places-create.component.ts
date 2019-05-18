import { TypeService } from './../../../../common/services/type.service';
import { WorkTimeModel, WorkTimeDNModel } from './../../../../common/models/place.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/common/services/main.service';
import { Component, OnInit } from '@angular/core';
import { ImageModel } from 'src/app/common/models/image.model';
import { PlaceModel } from 'src/app/common/models/place.model';

@Component({
  selector: 'app-places-create',
  templateUrl: './places-create.component.html',
  styleUrls: ['./places-create.component.scss']
})
export class PlacesCreateComponent implements OnInit {

  NewPlace: PlaceModel = new PlaceModel();
  Places: PlaceModel[] = [];
  isImageByModel = false;
  isEdit = false;
  isEditAdress = false;

  tags = ['tag1', 'tag2'];

  WorkTimes: WorkTimeDNModel[] = [];

  EstimatedTime = {
    time: 0,
    period: 'hour'
  };

  typeOfPlace = [];

  constructor(private service: MainService, private typeService: TypeService, private router: Router, private route: ActivatedRoute) {
     route.params.subscribe(
       params => {
         if (params['id']) {
           this.service.GetPlaceById(params['id'])
            .subscribe(
              (res) => {
                this.NewPlace = res;
                this.isEdit = true;
                this.isImageByModel = true;
                this.removeEditPlace();
                this.converTimeByModel();
                this.NewPlace.categories = this.typeService.ConvertPlaceCategoriesFromBackToFront(this.NewPlace.categories);
              }
            );
         }
       }
      );
  }

  ngOnInit() {
    this.GetPlaces();
    this.AddWorkTime();

    this.typeOfPlace = this.typeService.GetPlaceCategoriesValues();
  }

  AddWorkTime() {
    const NewDay: WorkTimeDNModel = new WorkTimeDNModel();
    this.WorkTimes.push(NewDay);
  }




  GetPlaces() {
    this.service.GetMyPlaces()
      .subscribe(
        (res: PlaceModel[]) => {
          this.Places = res;
          this.removeEditPlace();
        }
      );
  }

  removeEditPlace() {
    let index = -1;
    if (this.isEdit) {
      for (let i = 0; i < this.Places.length; i++) {
        if (this.Places[i].id === this.NewPlace.id) {
          index = i;
          break;
        }
      }
      this.Places.splice(index, 1);
    }
  }

  CreatePlace() {
    if (this.NewPlace.image && this.NewPlace.image.base64) {
      this.NewPlace.image.base64 = this.NewPlace.image.base64.split('base64,')[1];
    }
    this.convertTimes();

    this.NewPlace.categories = this.typeService.ConvertPlaceCategoriesFromFrontToBack(this.NewPlace.categories);

    if (this.isEdit) {
      this.service.UpdatePlace(this.NewPlace)
      .subscribe(
        (res) => {
          this.router.navigate(['/home', 'places']);
        }
      );
      console.log(`Update`);
    } else {
    this.service.CreatePlace(this.NewPlace)
      .subscribe(
        (res) => {
          this.router.navigate(['/home', 'places']);
        }
      );
    }

  }

  onSelectAddress(event) {
    this.NewPlace.address = event.address;
    this.NewPlace.lat = event.lat;
    this.NewPlace.lng = event.lng;
  }

  uploadImage($event) {
    this.ReadImages(
        $event.target.files,
        (res: string) => {
            this.isImageByModel = false;
            this.NewPlace.image = new ImageModel();
            this.NewPlace.image.base64 = res;
        }
    );
  }

    protected ReadImages(files: any, callback?: (params?) => any) {
        for ( const f of files) {
            const file: File = f;
            if (!file) {
              break;
            }
            const myReader: FileReader = new FileReader();
            myReader.onloadend = (e) => {
                callback(myReader.result);
            };
            myReader.readAsDataURL(file);
        }
    }

    GetImageURL(id) {
      return 'http://35.204.142.44:3000/images/' + id;
    }

  getMask(time: string): {
    mask: Array<string | RegExp>;
    keepCharPositions: boolean;
  } {
    return {
      mask: [/[0-1]/, time && parseInt(time[0]) >= 1 ? /[0-2]/ : /\d/, ':', /[0-5]/, /\d/],
      keepCharPositions: true
    };
  }

  convertTimes() {
    this.NewPlace.work_times = [];
    for (const time of this.WorkTimes) {
      let tmp_open_time = time.open_time;
      if (time.open_time_dn === 'pm') {
        tmp_open_time = this.convert12Hto24H(tmp_open_time);
      }

      let tmp_close_time = time.close_time;
      if (time.close_time_dn === 'pm') {
        tmp_close_time = this.convert12Hto24H(tmp_close_time);
      }

      this.NewPlace.work_times.push(
        new WorkTimeModel(
          tmp_open_time,
          tmp_close_time,
          time.day
        )
      );
    }

    this.NewPlace.estimated_time = 0;
    if (this.EstimatedTime.period === 'min') {
      this.NewPlace.estimated_time = this.EstimatedTime.time * 60;
    }
    if (this.EstimatedTime.period === 'hour') {
      this.NewPlace.estimated_time = this.EstimatedTime.time * 3600;
    }
    if (this.EstimatedTime.period === 'day') {
      this.NewPlace.estimated_time = this.EstimatedTime.time * 3600 * 24;
    }
  }
  convert12Hto24H (time: string) {
    let time_elements = time.split(':');
    time_elements[0] = (+time_elements[0] + 12) + '';
    return time_elements.join(':');
  }

  changeAddressText() {
    this.isEditAdress = false;
  }

  converTimeByModel () {
    this.EstimatedTime.time = this.NewPlace.estimated_time;
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
    for (const time of this.NewPlace.work_times) {

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
    console.log(this.WorkTimes);


  }



}
