import { Component, OnInit } from '@angular/core';
import { KpopHttpService } from './kpop-http.service';
import { Kpop } from './kpop';

@Component({
  selector: 'app-kpop',
  templateUrl: './kpop.component.html',
  styleUrls: ['./kpop.component.scss']
})
export class KpopComponent implements OnInit {
  idols: Kpop[];
  idolsPromise: Promise<Kpop[]>;

  constructor(private kpopHttpService: KpopHttpService) { }

  ngOnInit() {
    this.kpopHttpService.getIdols()
      .then(idols => {
        this.idols = idols;
      });

    this.idolsPromise = this.kpopHttpService.getIdols();
  }

}
