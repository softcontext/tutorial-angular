import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// https://infoscis.github.io/2017/06/19/TypeScript-handbook-advanced-types/
type PaneType = 'left' | 'right';

@Component({
  selector: 'app-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss'],
  // 이 컴포넌트가 필요한 데이터는 초기에 한 번만 받으면 된다.
  // 추 후, 앱의 다른 컴포넌트에서 발생한 변화와 무관한 컴포넌트다.
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({
        transform: 'translateX(0)'
      })),
      state('right', style({
        transform: 'translateX(-50%)'
      })),
      transition('* => *', animate(300))
    ])
  ]
})
export class SlidePanelComponent implements OnInit {
  @Input() activePane: PaneType = 'left';

  constructor() { }

  ngOnInit() { }

}
