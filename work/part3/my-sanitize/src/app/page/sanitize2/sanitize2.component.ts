import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-sanitize2',
  templateUrl: './sanitize2.component.html',
  styleUrls: ['./sanitize2.component.scss']
})
export class Sanitize2Component implements OnInit {
  html: SafeHtml;
  src: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // 스크립트 코드는 배치되지만 실행은 되지 않는다.
    this.html = this.sanitizer.bypassSecurityTrustHtml(
      '<h1>Sanitization</h1><script>console.log("I am alive. Yes!")</script>');

    // 참고: https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Frame-Options
    // X-Frame-Options 설정을 하지 않은 서버는 리소스를 가져다가 iframe안에 배치할 수 있다.
    // 예를 들어서 쿠팡은 보인다; 하지만 대 부분의 코드는 보안설정으로 수행되지 않는다.
    // https://www.google.com/ 사이트는 자기 콘텐츠를 다운받아서
    // iframe안에 베치하는 것을 허용하지 않는다.
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(
      'http://yourheartbadge.co.kr/');
  }

  ngOnInit() { }

}
