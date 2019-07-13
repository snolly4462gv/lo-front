import { MainService } from 'src/app/common/services/main.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private service: MainService, private route: ActivatedRoute) {
    this.service.CheckMe();
  }

}
