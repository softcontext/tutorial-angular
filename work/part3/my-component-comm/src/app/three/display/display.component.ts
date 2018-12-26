import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBridgeService } from '../event-bridge.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {
  count: number = 0;
  subscription: Subscription;

  constructor(private eventBridgeService: EventBridgeService) { }

  ngOnInit() {
    this.subscription = this.eventBridgeService.observe().subscribe(data => {
      if (data.signal === '+') {
        this.count++;
      } else {
        this.count--;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
