import { MainService } from 'src/app/common/services/main.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private service: MainService) {
    this.service.CheckMe();
  }
}
