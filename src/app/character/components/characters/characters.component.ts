import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]>;

  constructor(
    private charactersService: CharactersService
  ) { }

  ngOnInit() {
    this.characters$ = this.charactersService.getCharacters();
  }

}
