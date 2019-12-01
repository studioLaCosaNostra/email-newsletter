import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SUBSCRIBE_URL } from './constants';

@Injectable()
export class SubscribeService {

  constructor(private http: HttpClient) { }

  subscribe(newsletterId: string, email: string) {
    const url = `${SUBSCRIBE_URL}?newsletter=${newsletterId}&email=${email}`;
    return this.http.get(url, {
      responseType: 'text'
    });
  }
}
