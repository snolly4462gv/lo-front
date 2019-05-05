import { RouteModel } from './../../../../common/models/route.model';
import { MainService } from './../../../../common/services/main.service';
import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';
import { ImageModel } from 'src/app/common/models/image.model';

@Component({
  selector: 'app-create-route-general',
  templateUrl: './create-route-general.component.html',
  styleUrls: ['./create-route-general.component.scss']
})
export class CreateRouteGeneralComponent implements OnInit {
  tags = ['Tag1', 'Tag2'];

  Places: PlaceModel[] = [];

  Route: RouteModel = new RouteModel();
  isImageByModel = false;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.Places = this.service.GetPlaces();

    if (this.service.Route) {
      this.Route = this.service.Route;
    }
  }

  SaveRouteInfoToService () {
    this.service.Route = this.Route;
  }

  uploadImage($event){
    this.ReadImages(
        $event.target.files,
        (res: string) => {
            this.isImageByModel = false;
            this.Route.image = new ImageModel();
            this.Route.image.base64 = res;
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
