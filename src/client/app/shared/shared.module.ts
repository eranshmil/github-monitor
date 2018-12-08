import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { PipesModule } from './pipes/pipes.module';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule, ...MATERIAL_MODULES, PipesModule],
  exports: [CommonModule, TranslateModule, ...MATERIAL_MODULES, PipesModule]
})
export class SharedModule {}
