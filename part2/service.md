# Service

## Custom Service

**data-holder.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataHolderService {
  dataShared = 'Hello World!';

  constructor() { }

  getData() {
    return this.dataShared;
  }

  setData(data) {
    this.dataShared = data;
  }
}
```

**data-holder.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { DataHolderService } from '../data-holder.service';

@Component({
  selector: 'app-data-holder',
  templateUrl: './data-holder.component.html',
  styleUrls: ['./data-holder.component.scss']
})
export class DataHolderComponent implements OnInit {
  data;
  message;

  constructor(private dataHolderService: DataHolderService) {
    console.log('DataHolderComponent()');
  }

  ngOnInit() {
    console.log(Object.getPrototypeOf(this.dataHolderService));
    this.data = this.dataHolderService.getData();
  }

  save() {
    this.dataHolderService.setData(this.data);
    this.message = 'Saved';
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
```

**data-holder.component.scss**

```scss
.row {
  margin-bottom: 1rem;
}
```

**data-holder.component.html**

```html
<div class="container">
  <div class="alert alert-primary" role="alert" *ngIf="message">
    {{message}}
  </div>

  <div class="row">
    <div class="col-auto">
      <h2>{{data}}</h2>
    </div>
  </div>

  <div class="row">
    <div class="col-auto">
      <input class="form-control" type="text" [(ngModel)]="data">
    </div>
    <div class="col-auto">
      <button class="btn btn-primary" type="button" (click)="save()">Save</button>
    </div>
  </div>

  <div class="row">
    <div class="col-auto">
      <p>{{this.dataHolderService | json}}</p>
    </div>
  </div>
</div>
```
