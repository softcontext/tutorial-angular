import { Component, OnInit, Optional } from '@angular/core';

import { UserHttpService } from '../core/user-http.service';
import { MemberConfig } from './member-config';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [{ provide: UserHttpService, useClass: UserHttpService }]
})
export class MemberComponent implements OnInit {

  constructor(
    private userHttpService: UserHttpService,
    @Optional() private memberConfig: MemberConfig,
    private renderer: Renderer2
  ) {
    console.log('MemberComponent()');
    console.log('memberConfig =', memberConfig);
  }

  @ViewChild('target') pElementRef: ElementRef;

  ngOnInit() {
    if (this.memberConfig) {
        this.renderer.setStyle(this.pElementRef.nativeElement,
          'color', this.memberConfig.color);
    }
  }

}
