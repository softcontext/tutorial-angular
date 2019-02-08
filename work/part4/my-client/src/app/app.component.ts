import { Component, OnInit } from '@angular/core';
import { Cat, CatHttpService } from 'src/app/service/cat-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private catHttpService: CatHttpService) {}

  ngOnInit() {
    this.catHttpService.getAllCats().subscribe((data) => {
      console.log('1. getAllCats')
      console.log(data)
    })
    this.catHttpService.getCat('gg').subscribe((data) => {
      console.log('2. getCat')
      console.log(data)
    })
    this.catHttpService.insertCat({name: 'bb'}).subscribe((data) => {
      console.log('3. insertCat')
      console.log(data)
    })
    this.catHttpService.updateCat({name: 'cc'}).subscribe((data) => {
      console.log('4. updateCat')
      console.log(data)
    })
    this.catHttpService.deleteCat('cc').subscribe((data) => {
      console.log('5. deleteCat')
      console.log(data)
    })
  }

}
