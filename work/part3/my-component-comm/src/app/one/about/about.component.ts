import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { DataHolderService } from '../data-holder.service';
import { LogService as Debug } from '../../common/log.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  data: Data = {
    title: null,
    date: null
  };

  constructor(
    private dataHolderService: DataHolderService,
    private debug: Debug) {
    this.debug.log('AboutComponent', 'constructor()');
  }

  ngOnInit() {
    this.debug.log('AboutComponent', 'ngOnInit()');
    this.lookup();
  }

  backup() {
    this.debug.log('AboutComponent', 'backup()');
    this.dataHolderService.setData(this.data);
  }

  lookup() {
    this.debug.log('AboutComponent', 'lookup()');
    this.data = this.dataHolderService.getData();
  }
}
