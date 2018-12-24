import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UserHttpService } from '../core/user-http.service';
import { PlayerHttpService } from '../player/player-http.service';
import { DataShareService } from '../share/data-share.service';
// import { CoachHttpService } from '../player/coach-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {

  constructor(
    private userHttpService: UserHttpService,
    private playerHttpService: PlayerHttpService,
    private dataShareService: DataShareService,
    /**
     * ERROR Error:
     * StaticInjectorError(AppModule)[HomeComponent -> CoachHttpService]:
     * StaticInjectorError(Platform: core)[HomeComponent -> CoachHttpService]:
     *   NullInjectorError: No provider for CoachHttpService!
     */
    // private coachHttpService: CoachHttpService
  ) {
    console.log('HomeComponent()');
  }

  ngOnInit() { }

}
