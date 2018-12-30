import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  isSubmitted: boolean = false;
  article: string = 'A long time ago in a galaxy far, far away...';

  constructor() { }

  ngOnInit() { }

  submit() {
    // Some logic to save

    this.isSubmitted = true;

    // prevent default
    // FormsModule 모듈을 임포트 했다면 필요없다.
    return false;
  }
}
