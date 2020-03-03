import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GENDER_FILTERS, SPECIES_FILTERS } from '../../models/filter';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  genderFilters: Array<string> = GENDER_FILTERS;
  speciesFilters: Array<string> = SPECIES_FILTERS;

  selectedFilters: Array<string> = [];

  @Input()
  filters: Array<string>;

  // event name should be inputName + "Change"
  @Output()
  filtersChange: EventEmitter<Array<string>> = new EventEmitter();

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.selectedFilters = this.filterService.selectedFilters;
  }

  filterSelect(selectedFilter: string, type: string) {
    this.filterService.handleSelectedFilters(selectedFilter);
    this.selectedFilters = this.filterService.selectedFilters;
    this.filtersChange.emit(this.selectedFilters);
  }

}
