import { Component } from '@angular/core';

import { Commit } from '@common/entities';

import { CommitService } from '../../services';
import { AbstractTableComponent } from '../../utils/abstract-table.component';

@Component({
  selector: 'sml-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent extends AbstractTableComponent<Commit> {
  public displayedColumns: string[] = [
    'id',
    'project',
    'committedAt',
    'author',
    'message',
    'open'
  ];

  constructor(protected _service: CommitService) {
    super();
  }
}
