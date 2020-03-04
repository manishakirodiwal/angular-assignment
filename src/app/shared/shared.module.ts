import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './pipes/sort.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [SortPipe, SearchPipe],
  imports: [
    CommonModule
  ],
  exports:[SortPipe, SearchPipe]
})
export class SharedModule { }
