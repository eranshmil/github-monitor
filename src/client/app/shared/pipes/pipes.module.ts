import { NgModule } from '@angular/core';

import { OcticonPipe } from './octicon.pipe';

@NgModule({
  declarations: [OcticonPipe],
  exports: [OcticonPipe]
})
export class PipesModule {}
