import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-route-order',
  templateUrl: './create-route-order.component.html',
  styleUrls: ['./create-route-order.component.scss']
})
export class CreateRouteOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dropEnd() {
    console.log(`drop end`);
  }

listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];

}
