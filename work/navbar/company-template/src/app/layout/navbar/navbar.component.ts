import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function() {
      // .header 클래스의 높이를 화면 높이로 지정합니다.
      $('.header').height($(window).height());

      // 네비바 앵커태그를 클릭하면 id로 대상을 찾아서 스크롤합니다.
      $(".navbar a").click(function() {
        var x = $("#" + $(this).data('value'));

        if (x.length) {
          $("body, html").animate({
            scrollTop: $("#" + $(this).data('value')).offset().top
          }, 1000)
        }
      })
    });
  }

}
