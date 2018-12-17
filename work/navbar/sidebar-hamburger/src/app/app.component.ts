import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    
    <app-sidebar>
      <div class="outlet">
        <router-outlet></router-outlet>
      </div>
    </app-sidebar>
  `,
  styles: []
})
export class AppComponent {

}
