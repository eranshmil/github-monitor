import { Injectable } from '@angular/core';

import { Issue } from '@common/entities';

import { AbstractService } from './abstract.service';

@Injectable()
export class IssueService extends AbstractService<Issue> {
  protected _errorMessageKey = 'ISSUES.ERROR';
  protected _urlPath = 'issue';
  protected _responseKey = 'issues';
}
