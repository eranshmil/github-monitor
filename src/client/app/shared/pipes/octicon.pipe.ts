import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as octicons from 'octicons';

@Pipe({
  name: 'octicon'
})
@Injectable()
export class OcticonPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(icon: string, scale: number = 1.4): SafeHtml {
    if (!octicons[icon]) {
      return '';
    }

    let options = {};
    if (scale && typeof scale === 'number' && scale > 0) {
      const { width, height } = octicons[icon];

      options = {
        width: width * scale,
        height: height * scale
      };
    }

    return this._sanitizer.bypassSecurityTrustHtml(
      octicons[icon].toSVG(options)
    );
  }
}
