# Sanitization

보안상의 이유로 스크립트 문자열을 동적으로 템플릿에 포함시킬 수 없습니다. 엘리먼트 중에서 iframe의 src 속성에도 동적으로 할당할 수 없습니다.

다음 프로젝트를 참고합니다. 먼저 안되는 현상을 알아보겠습니다.

```bash
$ ng new my-sanitize
```

**src\app\page\sanitize1\sanitize1.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sanitize1',
  templateUrl: './sanitize1.component.html',
  styleUrls: ['./sanitize1.component.scss']
})
export class Sanitize1Component implements OnInit {
  // 스크립트는 무시된다.
  html = '<h1>Sanitization</h1><script>alert("I am alive. NO!")</script>';

  // Sanitization 룰이 적용되어 에러가 발생한다.
  // unsafe value used in a resource URL context
  src = 'https://www.google.com';

  constructor() { }

  ngOnInit() { }
}
```

**src\app\page\sanitize1\sanitize1.component.html**

```html
<div [innerHtml]="html"></div>

<iframe [src]="src"></iframe>
```

정말 가끔은 꼭 스크립트를 동적으로 배치하고 싶은 경우가 있습니다. 어떻게 해결할 수 있는지 알아보겠습니다.

우선, 쉽게 새니타이제이션을 적용할 수 있도록 파이프를 만듭니다.

**src\app\pipe\sanitize-html.pipe.ts**

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
```

**src\app\pipe\sanitize-resource-url.pipe.ts**

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Pipe({
  name: 'sanitizeResourceUrl'
})
export class SanitizeResourceUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(resourceUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(resourceUrl);
  }

}
```

컴포넌트를 만들고 파이프를 이용해 보도록 합니다.

**src\app\page\sanitize2\sanitize2.component.ts**

```ts
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
```

**src\app\page\sanitize2\sanitize2.component.html**

```html
<div [innerHtml]="html"></div>

<!-- 인터폴레이션 식은 ``, \" 등에 코드를 파싱하지 못한다. -->
<div [innerHtml]="'<h1>Sanitization</h1><script>console.log(1)</script>' | sanitizeHtml">
</div>

<iframe [src]="src" width="560" height="315"></iframe>

<iframe [src]="'http://yourheartbadge.co.kr/' | sanitizeResourceUrl" 
  width="560" height="315">
</iframe>
```

sanitizeHtml, sanitizeResourceUrl 파이프를 사용하면 컴포넌트 클래스안에 코드가 없어도 되므로 깔끔해 집니다.
