import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpolation',
  template: `
  <div class="container">
    1 + 2 = {{1 + 2}}
    <br>
    {{say() + " Angular!"}}
    <br>
    {{say()==="Hi" ? "Good" : "Bye"}}
    <br>
    [ {{basket.items[0]}}, {{basket.items[1]}}, {{basket.items[2]}} ]
    <br>
    message : {{message}}
    <br>
    <form class="form-inline mt-2 mb-2">
      <div class="form-row">
        <input type="email" id="email" class="form-control mr-1" value="{{className}}">
        {{' '}}
        <button type="button" class="btn {{className}}">{{className}}</button>
      </div>
    </form>
    <span *ngFor="let n of numbers">{{n + ' '}}</span>
    <form class="form mt-2 mb-2">
      <div class="form-group">
        <label for="comment">Comment:</label>
        <textarea id="comment" class="form-control" rows="4"
          cols="40" value="{{className}}"></textarea>
      </div>
    </form>
  </div>
  `,
  styles: [
    `
    .container {
      margin-top: 2rem;
    }
    `
  ]
})
export class InterpolationComponent implements OnInit {
  className = "btn-primary";
  basket = {
    items: []
  };
  numbers;
  message;

  constructor() {
    this.basket.items.push('Apple');
    this.basket.items.push('Orange');
    this.basket.items.push('Banana');
    this.numbers = Array(10).fill(0).map((item, i) => i + 1);
  }

  ngOnInit() {
    let x = 'Hello';
    let y = 'World';
    this.message = `${x} ${y}!`;
  }

  say() {
    return "Hi";
  }

}
