import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Observable, of } from 'rxjs';
import { Character } from '../../models/character';
import { FilterService } from '../../services/filter.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { map, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]>;
  selectedFilters: string[] = [];

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
        this.characters$ = of(value.results);
      }, (error) => {
        this.characters$ = undefined;
      });
  }

  handleFilters(selectedFilter) {
    this.filterService.handleSelectedFilters(selectedFilter);
    const selectedFilters = this.filterService.selectedFilters;
    console.log('===selected', selectedFilters);
  }

  pageChange(event) {
    this.currentPage = event;
    this.charactersService.pageNumber = this.currentPage;
    this.getCharacters();
  }

}
