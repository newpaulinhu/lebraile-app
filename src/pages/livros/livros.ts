import { Component } from '@angular/core';

/**
 * Generated class for the LivrosPage component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'livros',
  templateUrl: 'livros.html'
})
export class LivrosPage {

  text: string;

  constructor() {
    console.log('Hello LivrosComponent Component');
    this.text = 'Hello World';
  }

}
