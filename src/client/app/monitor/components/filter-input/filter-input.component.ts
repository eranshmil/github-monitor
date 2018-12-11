import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sml-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterInputComponent implements OnInit, OnDestroy {
  @Output() changed: EventEmitter<string> = new EventEmitter();
  @ViewChild('filter') filter: ElementRef;

  public value = '';
  private _keyUpEventSubscription: Subscription;

  ngOnInit() {
    this.initKeyUpEvent();
  }

  ngOnDestroy() {
    if (this._keyUpEventSubscription) {
      this._keyUpEventSubscription.unsubscribe();
    }
  }

  /**
   * Emit filter value after a 1sec debounce, to prevent excessive filter events.
   */
  private initKeyUpEvent() {
    this._keyUpEventSubscription = fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.currentTarget.value),
        debounceTime(1000)
      )
      .subscribe((text: string) => {
        if (text === this.value) {
          return;
        }

        this.value = text;
        this.changed.emit(text);
      });
  }
}
