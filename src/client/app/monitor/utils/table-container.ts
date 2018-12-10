import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { BaseEntity } from '@common/entities';

/**
 * An abstract class that builds a simple material table.
 */
export abstract class TableContainer<T extends BaseEntity<T>>
  implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public abstract displayedColumns: string[];
  public dataSource: MatTableDataSource<T>;
  public pageSizeOptions = [50, 100];

  protected abstract _service;

  ngOnInit() {
    this._service.list().subscribe(entities => this._initDataSource(entities));
  }

  private _nestedFilterPredicate(
    entity: BaseEntity<T>,
    filter: string
  ): boolean {
    const transformedFilter = filter.trim().toLowerCase();

    const dataAsFlatString = (obj: Object): string => {
      let returnVal = '';

      Object.values(obj).forEach(val => {
        if (typeof val !== 'object') {
          returnVal = returnVal.concat(' ', val);
        } else if (val !== null) {
          returnVal = returnVal.concat(' ', dataAsFlatString(val));
        }
      });

      return returnVal.trim().toLowerCase();
    };

    return dataAsFlatString(entity).includes(transformedFilter);
  }

  private _initDataSource(entities: T[]) {
    this.dataSource = new MatTableDataSource(entities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (entity: T, filter: string) =>
      this._nestedFilterPredicate(entity, filter);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
