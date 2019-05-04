import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/common/services/main.service';
import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';
import { ImageModel } from 'src/app/common/models/image.model';
import { PlaceMapModel } from 'src/app/common/models/place-map.model';

@Component({
  selector: 'app-places-create',
  templateUrl: './places-create.component.html',
  styleUrls: ['./places-create.component.scss']
})
export class PlacesCreateComponent implements OnInit {

  NewPlace: PlaceModel = new PlaceModel();
  Places: PlaceMapModel[] = [];
  isImageByModel = false;
  isEdit = false;

  constructor(private service: MainService, private router: Router, private route: ActivatedRoute) {
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
        (res: PlaceMapModel[]) => {
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
    if (this.NewPlace.image.base64) {
      this.NewPlace.image.base64 = this.NewPlace.image.base64.split('base64,')[1];
    }
    this.service.CreatePlace(this.NewPlace)
      .subscribe(
        (res) => {
          this.router.navigate(['/home', 'places']);
        }
      );
  }

  onSelectAddress(event) {
    this.NewPlace.address = event.address;
    this.NewPlace.lat = event.lat;
    this.NewPlace.lng = event.lng;
  }

  uploadImage($event){
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

}
