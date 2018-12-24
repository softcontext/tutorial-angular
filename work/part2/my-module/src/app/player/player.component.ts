import { Component, OnInit } from '@angular/core';

import { CoachHttpService } from './coach-http.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private coachHttpService: CoachHttpService) {
    console.log(coachHttpService);
    console.log('PlayerComponent()');
  }

  ngOnInit() { }

}
