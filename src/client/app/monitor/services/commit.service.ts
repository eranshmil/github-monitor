import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Commit } from '@common/entities';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CommitService {
  constructor(private _http: HttpClient) {}

  public list(): Observable<Commit[]> {
    return this._http
      .get<Commit[]>('http://localhost:3000/commit')
      .pipe(map((response: any) => response.commits));
  }
}
