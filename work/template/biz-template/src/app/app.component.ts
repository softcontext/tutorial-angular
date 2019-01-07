import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // Sticky Header
    $(window).scroll(function() {
      let scroll: number = $(window).scrollTop();
      if (scroll >= 100) {
        $('.top-nav').addClass('light-header');
      } else {
        $('.top-nav').removeClass('light-header');
      }
    });

    // Year for copy content
    $(function() {
      let theYear: number = new Date().getFullYear();
      $('#year').html('' + theYear);
    });

  }

}
