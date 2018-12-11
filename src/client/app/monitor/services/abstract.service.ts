import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../environments/environment';

@Injectable()
export abstract class AbstractService<T> {
  protected abstract _errorMessageKey: string;
  protected abstract _urlPath: string;
  protected abstract _responseKey: string;

  constructor(
    private _translate: TranslateService,
    private _http: HttpClient,
    private _matSnackBar: MatSnackBar
  ) {}

  /**
   * Generic function to retrieve a list from server,
   *  catch errors and show error in a snackbar.
   */
  public list(): Observable<T[]> {
    return this._translate.get(this._errorMessageKey).pipe(
      switchMap(errorMessage => {
        return this._http
          .get<T[]>(`${environment.apiUrl}/${this._urlPath}`)
          .pipe(
            map((response: any) => response[this._responseKey]),
            catchError(() => {
              this._matSnackBar.open(errorMessage);

              return of();
            })
          );
      })
    );
  }
}
