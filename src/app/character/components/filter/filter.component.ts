import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { GENDER_FILTERS, SPECIES_FILTERS } from '../../models/filter';
import { FilterService } from '../../services/filter.service';
import { FilterType } from '../../models/selected-filter';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  genderFilters: Array<string> = GENDER_FILTERS;
  speciesFilters: Array<string> = SPECIES_FILTERS;
  selectedFilters: Array<FilterType> = [];

  @Input()
  filters: Array<FilterType>;

  @Output()
  filtersChange: EventEmitter<Array<FilterType>> = new EventEmitter();

  constructor(
    private filterService: FilterService) { }

  ngOnInit() {
    this.selectedFilters = this.filterService.selectedFilters;
  }

  ngOnChanges(value) {
    console.log('===value', value);
  }

  filterSelect(selectedFilter: string, type: string) {
    this.filterService.handleSelectedFilters(selectedFilter, type);
    this.selectedFilters = this.filterService.selectedFilters;
    this.filterService.filterCharacters();
    this.filtersChange.emit(this.selectedFilters);
  }

}
