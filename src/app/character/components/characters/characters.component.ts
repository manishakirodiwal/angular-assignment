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
  group: FormGroup; // form - collection of control
  searchControl: FormControl // input box

  sortValue: string;

  constructor(
    private charactersService: CharactersService,
    private filterService: FilterService,
    private formBuilder: FormBuilder
  ) {

    this.searchControl = new FormControl();
    this.group = this.formBuilder.group({
      // html binding name : control object
      'search': this.searchControl
    })
  }

  ngOnInit() {
    this.selectedFilters = this.filterService.selectedFilters;
    this.charactersService.getCharacters()
      .subscribe((value) => {
        this.characters$ = of(value.results);
      });

    this.searchControl
      .valueChanges // value change event.publisher/observable
      .pipe(filter(value => !!value)) // non empty filter
      .pipe(map(value => value.trim().toLowerCase()))
      .pipe(debounceTime(500))
      .subscribe(value => {
        console.log('*' + value + '*');
        this.charactersService.searchCharacters(value)
          .subscribe((characterData) => {
            this.characters$ = of(characterData.results);
          });
      });
  }


  handleFilters(selectedFilter) {
    this.filterService.handleSelectedFilters(selectedFilter);
  }


}
