import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $(".dropdown").hover(
        function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideDown("400");
          $(this).toggleClass('open');
        },
        function() {
          $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideUp("400");
          $(this).toggleClass('open');
        }
      );
    });
  }

}
