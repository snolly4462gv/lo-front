import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/common/models/user.model';
import { MainService } from 'src/app/common/services/main.service';
import { UserGetModel } from 'src/app/common/models/user-get.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  User: UserModel = new UserModel();
  Error = '';
  constructor(private service: MainService) { }

  ngOnInit() {
  }

  Signup () {
    this.service.CreateUser(this.User)
      .subscribe(
        (res: UserGetModel) => {
          this.service.LoginUser(res);
        },
        (err) => {
          this.Error = '';
          for (var key in err.error)
            {
              this.Error += key.slice(0,1).toUpperCase() + key.slice(1);
            for(let e of err.error[key]) {
              this.Error += " " + e;
            }
              this.Error += '. '
            }
        }
      );
  }

}
