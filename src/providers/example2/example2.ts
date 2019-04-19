import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the Example2Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Example2Provider {

  constructor(public http: HttpClient) {
    console.log('Hello Example2Provider Provider');
  }

}
