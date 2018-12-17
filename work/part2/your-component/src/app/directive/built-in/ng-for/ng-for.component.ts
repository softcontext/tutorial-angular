import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.scss']
})
export class NgForComponent implements OnInit {
  tallestBuildings: Object[] = [];

  constructor() { }

  ngOnInit() {
    this.tallestBuildings.push({ name: 'Burj Khalifa', height: '2717'});
    this.tallestBuildings.push({ name: 'Shanghai Tower', height: '2073'});
    this.tallestBuildings.push({ name: 'Abraj Al-Bait Clock Tower', height: '1971'});
    this.tallestBuildings.push({ name: 'Ping An Finance Centre', height: '1965'});
  }

}
