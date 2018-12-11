import { Component } from '@angular/core';

import { Issue, IssueState } from '@common/entities';

import { IssueService } from '../../services';
import { AbstractTableComponent } from '../../utils/abstract-table.component';

@Component({
  selector: 'sml-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent extends AbstractTableComponent<Issue> {
  public displayedColumns: string[] = [
    'issueId',
    'project',
    'issuedAt',
    'username',
    'title',
    'state',
    'open'
  ];

  public issueState = IssueState;

  constructor(protected _service: IssueService) {
    super();
  }
}
