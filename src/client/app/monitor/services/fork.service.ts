import { Injectable } from '@angular/core';

import { Fork } from '@common/entities';

import { AbstractService } from './abstract.service';

@Injectable()
export class ForkService extends AbstractService<Fork> {
  protected _errorMessageKey = 'FORKS.ERROR';
  protected _urlPath = 'fork';
  protected _responseKey = 'forks';
}
