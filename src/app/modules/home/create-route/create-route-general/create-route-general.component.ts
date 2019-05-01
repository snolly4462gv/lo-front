import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-route-general',
  templateUrl: './create-route-general.component.html',
  styleUrls: ['./create-route-general.component.scss']
})
export class CreateRouteGeneralComponent implements OnInit {
  tags = ['Tag1'];
  constructor() { }

  ngOnInit() {
    this.initTags();
  }

  initTags(){}

}
