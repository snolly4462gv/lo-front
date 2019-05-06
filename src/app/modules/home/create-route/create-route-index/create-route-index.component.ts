import { RouteModel } from 'src/app/common/models/route.model';
import { MainService } from 'src/app/common/services/main.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-route-index',
  templateUrl: './create-route-index.component.html',
  styleUrls: ['./create-route-index.component.scss']
})
export class CreateRouteIndexComponent implements OnInit {

  Routes: RouteModel[] = [];
  RouteForSave: RouteModel = new RouteModel();

  isSaving = false;

  constructor(private service: MainService, private router: Router) { }

  ngOnInit() {
    this.GetRoutes();
  }

  GetRoutes() {
    this.service.GetMyRoutes()
      .subscribe(
        (res: RouteModel[]) => {
          this.Routes = res;
          console.log(this.Routes);
        }
      );
  }

  PublishRoute (route) {
     console.log(route);
    if (!this.isSaving) {
      this.isSaving = true;
      this.RouteForSave = route;
      let Places = route['places'];
      this.RouteForSave.places = [];
      console.log(Places);
      for (const item of Places) {
        this.RouteForSave.places.push(item.id);
      }
      this.RouteForSave.finished = true;
      console.log(`route`, route);
      this.service.UpdateRoute(this.RouteForSave)
        .subscribe(
          (res) => {
            this.GetRoutes();
          },
          () => {},
          () => {
            this.isSaving = false;
          }
        );

      }
    }
}
