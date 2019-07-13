import { TypeService } from './../../../../common/services/type.service';
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

  constructor(private service: MainService, private typeService: TypeService, private router: Router, private route: ActivatedRoute) {
    //  route.params.subscribe(
    //    params => {
    //      if (params['id']) {
    //        this.service.GetPlaceById(params['id'])
    //         .subscribe(
    //           (res) => {
    //             this.NewPlace = res;
    //             this.isEdit = true;
    //             this.isImageByModel = true;
    //             this.removeEditPlace();
    //             this.converTimeByModel();
    //             this.NewPlace.categories = this.typeService.ConvertPlaceCategoriesFromBackToFront(this.NewPlace.categories);
    //           }
    //         );
    //      }
    //    }
    //   );
  }

  ngOnInit() {
    this.GetPlaces();
  }

  onSelectAddress(address: any) {
    console.log(address);
    this.NewPlace.lat = address.lat;
    this.NewPlace.lng = address.lng;
  }



  GetPlaces() {
    this.service.GetAllPlaces()
      .subscribe(
        (res: PlaceModel[]) => {
          this.Places = res;
        }
      );
  }

  CreatePlace() {
    this.service.CreatePlace(this.NewPlace)
      .subscribe(
        (res) => {
          this.router.navigate(['/home', 'places']);
        }
      );
  }

  uploadImage($event) {
    this.ReadImages(
        $event.target.files,
        (res: string) => {
            this.isImageByModel = false;
            this.NewPlace.image = res;
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
