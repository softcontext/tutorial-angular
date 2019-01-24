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
