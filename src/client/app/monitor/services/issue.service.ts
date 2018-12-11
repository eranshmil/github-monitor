import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Issue } from '@common/entities';

import { environment } from '../../../environments/environment';

@Injectable()
export class IssueService {
  constructor(private _http: HttpClient) {}

  public list(): Observable<Issue[]> {
    return this._http
      .get<Issue[]>(`${environment.apiUrl}/issue`)
      .pipe(map((response: any) => response.issues));
  }
}
