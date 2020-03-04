import { Injectable } from '@angular/core';
import { environment }
  from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndPoint}/api/character`)
      .pipe(map(value => {
        return this.assignYearsDifference(value);
      }));
  }

  searchCharacters(q: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiEndPoint}/api/character?name=${q}`)
      .pipe(map(value => {
        return this.assignYearsDifference(value);
      }));
  }

  assignYearsDifference(value) {
    const valueResults = value.results;
    for (const value of valueResults) {
      const createdDate = new Date(value.created).getFullYear();
      const today = new Date().getFullYear();
      value.yearDifference = today - createdDate;
    }
    return value;
  }
}
