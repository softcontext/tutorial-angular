import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated // 기본 옵션
  // encapsulation: ViewEncapsulation.ShadowDom // 일부 브라우저만 지원
})
export class AppComponent {

}
