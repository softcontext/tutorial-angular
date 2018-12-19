import { Component, OnInit, Optional } from '@angular/core';

export class RoutingMapping {

}

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  routes: any[] = [];

  constructor(@Optional() private routingMapping: RoutingMapping) {
    if (routingMapping) {
      for (let key in routingMapping) {
        let path = routingMapping[key].path
        let component = routingMapping[key].component.name
        let obj = { path, component }
        this.routes.push(obj)
      }
    }
  }

  ngOnInit() {
  }

}
