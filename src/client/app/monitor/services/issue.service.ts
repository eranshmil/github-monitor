import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Issue } from '@common/entities';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class IssueService {
  constructor(private _http: HttpClient) {}

  public list(): Observable<Issue[]> {
    return this._http
      .get<Issue[]>('http://localhost:3000/issue')
      .pipe(map((response: any) => response.issues));
  }
}
