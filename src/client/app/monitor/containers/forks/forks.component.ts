import { Component } from '@angular/core';

import { Fork } from '@common/entities';

import { ForkService } from '../../services';
import { AbstractTableComponent } from '../../utils/abstract-table.component';

@Component({
  selector: 'sml-forks',
  templateUrl: './forks.component.html',
  styleUrls: ['./forks.component.scss']
})
export class ForksComponent extends AbstractTableComponent<Fork> {
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
