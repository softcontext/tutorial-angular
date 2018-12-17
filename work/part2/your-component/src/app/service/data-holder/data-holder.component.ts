import { Component, OnInit } from '@angular/core';
import { DataHolderService } from '../data-holder.service';

@Component({
  selector: 'app-data-holder',
  templateUrl: './data-holder.component.html',
  styleUrls: ['./data-holder.component.scss']
})
export class DataHolderComponent implements OnInit {
  data;
  message;

  constructor(private dataHolderService: DataHolderService) {
    console.log('DataHolderComponent()');
  }

  ngOnInit() {
    console.log(Object.getPrototypeOf(this.dataHolderService));
    this.data = this.dataHolderService.getData();
  }

  save() {
    this.dataHolderService.setData(this.data);
    this.message = 'Saved';
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
