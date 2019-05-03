import { MainService } from 'src/app/common/services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private service: MainService) { }

  ngOnInit() {
  }

  Logout () {
    this.service.LogoutUser();
  }

}
