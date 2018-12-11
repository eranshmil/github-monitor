import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { BaseEntity } from '@common/entities';

import { AbstractService } from '../services/abstract.service';

/**
 * An abstract class that builds a simple material table.
 */
export abstract class AbstractTableComponent<T extends BaseEntity<T>>
  implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public abstract displayedColumns: string[];
  public dataSource: MatTableDataSource<T>;
  public pageSizeOptions = [50, 100];

  protected abstract _service: AbstractService<T>;

  /**
   * Fetch relevant list from server.
   */
  ngAfterViewInit() {
    this._service.list().subscribe(entities => {
      if (entities) {
        this._initDataSource(entities);
      }
    });
  }

  /**
   * Override material table filter mechanism, to support nested objects.
   *
   * @param entity Current entity to filter check.
   * @param filter A term to filter by.
   */
  private _nestedFilterPredicate(
    entity: BaseEntity<T>,
    filter: string
  ): boolean {
    const transformedFilter = filter.trim().toLowerCase();

    // Merge all object values to one string,
    //  separated by unicode character,
    //  to avoid combined columns search results
    const dataAsFlatString = (obj: Object): string => {
      let returnVal = '';

      Object.values(obj).forEach(val => {
        if (typeof val !== 'object') {
          returnVal = returnVal.concat('◬', val);
        } else if (val !== null) {
          returnVal = returnVal.concat('◬', dataAsFlatString(val));
        }
      });

      return returnVal.trim().toLowerCase();
    };

    return dataAsFlatString(entity).includes(transformedFilter);
  }

  /**
   * Initialize paginator, sort and filter for the data source.
   *
   * @param entities List of entities received.
   */
  private _initDataSource(entities: T[]) {
    this.dataSource = new MatTableDataSource(entities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (entity: T, filter: string) =>
      this._nestedFilterPredicate(entity, filter);
  }

  /**
   * Filter the data source and goto first page.
   *
   * @param filterValue A term to filter by.
   */
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
