import { Component, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/common/models/route.model';
import { MainService } from 'src/app/common/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routes-index',
  templateUrl: './routes-index.component.html',
  styleUrls: ['./routes-index.component.scss']
})
export class RoutesIndexComponent implements OnInit {

  Routes: RouteModel[] = [];
  RouteForSave: RouteModel = new RouteModel();

  isSaving = false;

  isShowPublished = false;

  isLoadingRoutes = false;

  constructor(private service: MainService, private router: Router) { }

  ngOnInit() {
    this.GetRoutes();
  }

  GetRoutes() {
    this.isLoadingRoutes = true;
    this.service.GetMyRoutes()
      .subscribe(
        (res: RouteModel[]) => {
          this.Routes = res;
          this.Routes  = this.Routes.filter(x => this.isShowPublished ? x.status !== 'draft' : x.status === 'draft');
          console.log(this.Routes);
        },
        () => {},
        () => {
          setTimeout(() => {
            this.isLoadingRoutes = false;
          }, 500);
        }
      );
  }

  changeRouteType() {
    this.isShowPublished = !this.isShowPublished;
    this.GetRoutes();
  }

  PublishRoute (route, isPublish = true) {
      this.RouteForSave = route;
      let Places = route['places'];
      this.RouteForSave.places = [];
      console.log(Places);
      for (const item of Places) {
        this.RouteForSave.places.push(item.id);
      }
      this.RouteForSave.finished = isPublish;
      this.RouteForSave.categories = [];
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
