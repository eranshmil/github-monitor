import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Commit } from '@common/entities';

import { environment } from '../../../environments/environment';

@Injectable()
export class CommitService {
  constructor(private _http: HttpClient) {}

  public list(): Observable<Commit[]> {
    return this._http
      .get<Commit[]>(`${environment.apiUrl}/commit`)
      .pipe(map((response: any) => response.commits));
  }
}
