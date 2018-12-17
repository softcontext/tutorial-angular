import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-built-in',
  templateUrl: './built-in.component.html',
  styleUrls: ['./built-in.component.scss']
})
export class BuiltInComponent implements OnInit {
  /**
   * https://angular.io/api/common#pipes
   */
  str = "aBcDeFg";
  num = 1234.1234;
  date = new Date();
  a: number = 0.259;
  b: number = 1.3495;
  json = {
    info: { name: 'Tom', age: 20 },
    list: [
      { name: 'John', age: 21 },
      { name: 'Sam', age: 22 }
    ]
  };
  items = ['Apple', 'Banana', 'Candy', 'Donut'];
  dateAsString = '20201225';

  constructor(router: Router) {
    /**
     * 클릭 할 때 일반 해시 태그처럼 페이지 내의 특정 위치로 이동하고 싶습니다.
     * https://code.i-harness.com/ko-kr/q/226de7c
     */
    router.events.subscribe(s => {
      // NavigationEnd {id: 1, url: "/pipe/built-in#custom", urlAfterRedirects: "/pipe/built-in#custom"}
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        // UrlTree {root: UrlSegmentGroup, queryParams: {}, fragment: "custom"}
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) {
            element.scrollIntoView(true);
          }
        }
      }
    });
  }

  ngOnInit() { }

}
