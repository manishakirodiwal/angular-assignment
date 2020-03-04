import { Injectable } from '@angular/core';
import { FilterType } from '../models/selected-filter';
import { CharactersService } from './characters.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  selectedFilters: Array<FilterType> = [];

  constructor(
    private charactersService: CharactersService
  ) { }

  handleSelectedFilters(selectedFilter, type) {
    const index = this.selectedFilters.findIndex(obj => obj.value === selectedFilter);
    if (index === -1) {
      const filterType: FilterType = new FilterType();
      filterType.type = type;
      filterType.value = selectedFilter;
      this.selectedFilters.push(filterType);
    } else {
      this.selectedFilters.splice(index, 1);
    }
  }

  filterCharacters() {
    let characters = [...this.charactersService.allCharacters];
    const filteredCharacter = [];
    for (const filterValue of this.selectedFilters) {
      for (const character of characters) {
        if (character[filterValue.type.toLowerCase()] === filterValue.value){
          const index = filteredCharacter.findIndex(obj => obj.id === character.id);
          if(index === -1){
            filteredCharacter.push(character);
          }
        }
      }
    }

    this.charactersService.characters = filteredCharacter;
  }
}
