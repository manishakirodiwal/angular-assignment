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
  group: FormGroup;
  searchControl: FormControl

  sortValue: string = 'asc';

  constructor(
    private charactersService: CharactersService,
    private filterService: FilterService,
    private formBuilder: FormBuilder
  ) {

    this.searchControl = new FormControl();
    this.group = this.formBuilder.group({
      'search': this.searchControl
    })
  }

  ngOnInit() {
    this.selectedFilters = this.filterService.selectedFilters;
    this.charactersService.getCharacters()
      .subscribe(
        (value) => {
          this.characters$ = of(value.results);
        },
        (error) => {
          this.characters$ = undefined;
        }
      );

    this.searchControl
      .valueChanges
      .pipe(filter(value => !!value))
      .pipe(map(value => value.toLowerCase()))
      .pipe(debounceTime(500))
      .subscribe(value => {
        console.log('*' + value + '*');
        this.charactersService.searchCharacters(value)
          .subscribe(
            (value) => {
              this.characters$ = of(value.results);
            },
            (error) => {
              this.characters$ = undefined;
            }
          );
      });
  }

  handleFilters(selectedFilter) {
    this.filterService.handleSelectedFilters(selectedFilter);
    const selectedFilters = this.filterService.selectedFilters;
    console.log('===selected',selectedFilters);
  }


}
