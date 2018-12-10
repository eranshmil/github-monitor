import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Fork } from '@common/entities';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ForkService {
  constructor(private _http: HttpClient) {}

  public list(): Observable<Fork[]> {
    return this._http
      .get<Fork[]>('http://localhost:3000/fork')
      .pipe(map((response: any) => response.forks));
  }
}
