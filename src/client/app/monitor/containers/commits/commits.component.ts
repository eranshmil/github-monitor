import { Component } from '@angular/core';

import { Commit } from '@common/entities';

import { CommitService } from '../../services';
import { TableContainer } from '../../utils/table-container';

@Component({
  selector: 'sml-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent extends TableContainer<Commit> {
  public displayedColumns: string[] = [
    'id',
    'project',
    'date',
    'author',
    'message',
    'open'
  ];

  constructor(protected _service: CommitService) {
    super();
  }
}
