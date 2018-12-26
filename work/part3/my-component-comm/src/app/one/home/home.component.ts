import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { DataHolderService } from '../data-holder.service';
import { LogService as Debug } from '../../common/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: Data = {
    title: null,
    date: null
  };

  constructor(
    private dataHolderService: DataHolderService,
    private debug: Debug) {
    this.debug.log('HomeComponent', 'constructor()');
  }

  ngOnInit() {
    this.debug.log('HomeComponent', 'ngOnInit()');
    this.lookup();
  }

  backup() {
    this.debug.log('HomeComponent', 'backup()');
    this.dataHolderService.setData(this.data);
  }

  lookup() {
    this.debug.log('HomeComponent', 'lookup()');
    this.data = this.dataHolderService.getData();
  }
}
