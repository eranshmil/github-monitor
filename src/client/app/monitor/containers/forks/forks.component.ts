import { Component } from '@angular/core';

import { Fork } from '@common/entities';

import { ForkService } from '../../services';
import { TableContainer } from '../../utils/table-container';

@Component({
  selector: 'sml-forks',
  templateUrl: './forks.component.html',
  styleUrls: ['./forks.component.scss']
})
export class ForksComponent extends TableContainer<Fork> {
  public displayedColumns: string[] = [
    'project',
    'forkedAt',
    'username',
    'open'
  ];

  constructor(protected _service: ForkService) {
    super();
  }
}
