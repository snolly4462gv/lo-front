import { MainService } from 'src/app/common/services/main.service';
import { Component, OnInit } from '@angular/core';
import { UserGetModel } from 'src/app/common/models/user-get.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  User: UserGetModel = new UserGetModel();
  constructor(private service: MainService) { }

  ngOnInit() {
    this.User = this.service.User;
    this.service.onUserChange$.subscribe(
      (res) => {
        if (res) {
          this.User = this.service.User;
        }
      }
    );
    console.log(`this.User`, this.User);
  }

  Logout () {
    this.service.LogoutUser();
  }

}
