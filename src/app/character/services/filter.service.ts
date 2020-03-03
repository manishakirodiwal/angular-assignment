import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  selectedFilters: Array<string> = [];

  constructor() { }

  handleSelectedFilters(selectedFilter) {
    const index = this.selectedFilters.indexOf(selectedFilter);
    if (index == -1) {
      this.selectedFilters.push(selectedFilter);
    } else {
      this.selectedFilters.splice(index, 1);
    }
  }
}
