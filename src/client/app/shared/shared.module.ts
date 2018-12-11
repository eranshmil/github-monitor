import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { PipesModule } from './pipes/pipes.module';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ...MATERIAL_MODULES,
    PipesModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ...MATERIAL_MODULES,
    PipesModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000
      }
    }
  ]
})
export class SharedModule {}
