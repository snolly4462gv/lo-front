import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/common/models/login.model';
import { MainService } from 'src/app/common/services/main.service';
import { UserGetModel } from 'src/app/common/models/user-get.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Login: LoginModel = new LoginModel();
  Error = '';

  constructor(private service: MainService) { }

  ngOnInit() {}

  LoginUser() {
    this.Error = '';
    this.service.Login(this.Login)
      .subscribe(
        (res: UserGetModel) => {
          this.service.LoginUser(res);
        },
        (err) => {
          this.Error = 'Incorrect login or password.';
        }
      );
  }

}
