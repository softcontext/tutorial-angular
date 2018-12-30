import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, DoCheck {
  params: Params;
  data: Data;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  ngDoCheck() {
    this.params = this.activatedRoute.snapshot.params;
    this.data = this.activatedRoute.snapshot.data;
  }
}
