import { Router } from '@angular/router';
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

  constructor(private service: MainService, private router: Router) { }

  ngOnInit() {
    this.Places = this.service.GetPlaces();

    if (this.Places.length === 0) {
      this.router.navigate(['/home', 'create-route', 'places']);
      return;
    }
    if (this.Places.filter(x => x.order == null).length > 0) {
      this.router.navigate(['/home', 'create-route', 'order']);
      return;
    }

    if (this.service.Route) {
      this.Route = this.service.Route;
      if (this.Route.image_id) {
        this.isImageByModel = true;
      }
    }

    console.log(this.Route);
  }

  SaveRouteInfoToService () {
    this.service.SetRoute(this.Route);
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
