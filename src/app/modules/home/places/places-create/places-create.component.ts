import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/common/models/place.model';
import { ImageModel } from 'src/app/common/models/image.model';

@Component({
  selector: 'app-places-create',
  templateUrl: './places-create.component.html',
  styleUrls: ['./places-create.component.scss']
})
export class PlacesCreateComponent implements OnInit {

  NewPlace: PlaceModel = new PlaceModel();

  constructor() { }

  ngOnInit() {
  }

  onSelectAddress(event) {
    this.NewPlace.address = event.address;
    this.NewPlace.lat = event.lat;
    this.NewPlace.lng = event.lng;
  }

  uploadImage($event){
    this.ReadImages(
        $event.target.files,
        (res:string)=>{
          console.log(res);
            this.NewPlace.image = new ImageModel();
            this.NewPlace.image.base64 = res;
            // this.isNewImage = true;

        }
    );
  }

    protected ReadImages(files:any,callback?:(params?)=>any)
    {
        for(let f of files)
        {
            let file:File = f;
            if(!file)
               break;

            let myReader:FileReader = new FileReader();
            myReader.onloadend = (e) => {
                callback(myReader.result);
            }
            myReader.readAsDataURL(file);
        }
    }

}
