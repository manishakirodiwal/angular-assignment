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

  handleSelectedFilters(selectedFilter, type): void {
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


  filterCharacters(): void {
    let characters = [...this.charactersService.allCharacters];
    const genderSelectedFilters = [];
    const speciesSelectedFilters = [];
    const filteredCharacter = [];
    for (const filterValue of this.selectedFilters) {
      if (filterValue.type.toLowerCase() == 'gender') {
        genderSelectedFilters.push(filterValue.value)
      } else {
        speciesSelectedFilters.push(filterValue.value);
      }
    }
    for (const character of characters) {
      if (genderSelectedFilters.length && speciesSelectedFilters.length) {
        if (speciesSelectedFilters.includes(character.species) && genderSelectedFilters.includes(character.gender)) {
          this.insertItem(filteredCharacter, character);
        }
      } else if (genderSelectedFilters.length && !speciesSelectedFilters.length) {
        if (genderSelectedFilters.includes(character.gender)) {
          this.insertItem(filteredCharacter, character);
        }
      } else if (speciesSelectedFilters.length && !genderSelectedFilters.length) {
        if (speciesSelectedFilters.includes(character.species)) {
          this.insertItem(filteredCharacter, character);
        }
      } else if (!genderSelectedFilters.length && !speciesSelectedFilters.length) {
        this.insertItem(filteredCharacter, character);
      }
      this.charactersService.characters = filteredCharacter;
    }
  }

  insertItem(filteredCharacter: any[], character: any): void {
    const index = filteredCharacter.findIndex(obj => obj.id === character.id);
    if (index === -1) {
      filteredCharacter.push(character);
    }
  }

}
