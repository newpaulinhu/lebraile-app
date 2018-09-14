import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LetraTraduzida } from '../../pages/traducao/letra-traduzida';

/*
  Generated class for the ProvidersTradutoraServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TradutoraServiceProvider {
  private readonly apiRoot = 'https://lebraile-api.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  traduzirLetra(letra: string): Observable<LetraTraduzida> {
    const params = new HttpParams().set('letra', letra);
    return this.httpClient.get<LetraTraduzida>(`${this.apiRoot}/tradutora/letra`, {params: params});
  }
}
