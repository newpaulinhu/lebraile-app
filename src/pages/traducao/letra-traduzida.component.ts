import { Component, OnInit, Input } from '@angular/core';
import { LetraTraduzida } from './letra-traduzida';

@Component({
  selector: 'app-letra-traduzida',
  templateUrl: './letra-traduzida.component.html'
})
export class LetraTraduzidaComponent implements OnInit {

  @Input()
  public letra: LetraTraduzida
  
  constructor() { }

  ngOnInit() {
    console.log('aquiii')
    console.log(this.letra);
  }

}
