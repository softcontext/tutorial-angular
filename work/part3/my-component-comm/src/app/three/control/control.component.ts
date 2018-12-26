import { Component, OnInit } from '@angular/core';
import { EventBridgeService } from '../event-bridge.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(private eventBridgeService: EventBridgeService) { }

  ngOnInit() { }

  increase() {
    this.eventBridgeService.publish('+');
  }

  decrease() {
    this.eventBridgeService.publish('-');
  }
}
