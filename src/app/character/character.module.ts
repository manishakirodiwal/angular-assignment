import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './components/characters/characters.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SortPipe } from '../shared/pipes/sort.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CharactersComponent, FilterComponent,SortPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CharacterModule { }
