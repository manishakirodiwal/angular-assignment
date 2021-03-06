import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Observable, of } from 'rxjs';
import { Character } from '../../models/character';
import { FilterService } from '../../services/filter.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { map, filter, debounceTime } from 'rxjs/operators';
import { FilterType } from '../../models/selected-filter';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: Array<Character> = [];
  selectedFilters: Array<FilterType> = [];

  searchText: string;

  sortValue: string = 'asc';
  currentPage: number = 1;

  totalItems: number;

  constructor(
    private charactersService: CharactersService,
    private filterService: FilterService
  ) {

  }

  ngOnInit() {
    this.selectedFilters = this.filterService.selectedFilters;
    this.getCharacters();
  }

  getCharacters() {
    this.charactersService.getCharacters()
      .subscribe((value) => {
        this.totalItems = value.info.count;
        this.characters = value.results;
        this.charactersService.characters = this.characters;
        this.charactersService.allCharacters = [...this.characters];
      }, (error) => {
        this.characters = [];
      });
  }

  updateCharacters() {
    this.characters = this.charactersService.characters;
  }

  handleFilters(selectedFilter) {
    this.filterService.handleSelectedFilters(selectedFilter.value, selectedFilter.type);
    this.filterService.filterCharacters();
    this.characters = this.charactersService.characters;
  }

  pageChange(event) {
    this.currentPage = event;
    this.charactersService.pageNumber = this.currentPage;
    this.getCharacters();
  }

}
