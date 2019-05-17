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
    const Params = this.getUrlVars();
    console.log(`vk = `, Params['vk']);


    this.service.CheckMe();
  }

  getUrlVars() {
    const vars = {};
    const params = (window.location.href.split('?')[1]);
    const parts = params ? params.split('&') : undefined;
    if (parts) {
      for (const item of parts) {
        const tmp = item.split('=');
        vars[tmp[0]] = tmp[1];
      }
    }
    return vars;
}

}
