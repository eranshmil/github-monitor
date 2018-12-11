import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Fork } from '@common/entities';

import { environment } from '../../../environments/environment';

@Injectable()
export class ForkService {
  constructor(private _http: HttpClient) {}

  public list(): Observable<Fork[]> {
    return this._http
      .get<Fork[]>(`${environment.apiUrl}/fork`)
      .pipe(map((response: any) => response.forks));
  }
}
