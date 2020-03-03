import { Injectable } from '@angular/core';
import { environment }
  from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.apiEndPoint}/api/character`)
      // .pipe((character)=>{
      //   return character.results;
      // });
  }


  searchCharacters(q: string): Observable<Character[]> {
    return this.http
      .get<Character[]>(`${environment.apiEndPoint}/api/character?q=${q}`);
  }

}
