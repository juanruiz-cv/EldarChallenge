import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Articule } from '@models/main.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private BASE_URL: string = `https://jsonplaceholder.typicode.com`;
  constructor(private _http: HttpClient) {}

  getAllPosts(): Observable<Articule[]> {
    return this._http.get<Articule[]>(`${this.BASE_URL}/posts`);
  }
}
