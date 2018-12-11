import { Injectable } from '@angular/core';

import { Commit } from '@common/entities';

import { AbstractService } from './abstract.service';

@Injectable()
export class CommitService extends AbstractService<Commit> {
  protected _errorMessageKey = 'COMMITS.ERROR';
  protected _urlPath = 'commit';
  protected _responseKey = 'commits';
}
