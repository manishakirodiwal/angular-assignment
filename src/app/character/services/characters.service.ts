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
      .get<any[]>(`${environment.apiEndPoint}/api/character`)
  }


  searchCharacters(q: string): Observable<any> {
    return this.http
      .get<any[]>(`${environment.apiEndPoint}/api/character?q=${q}`);
  }

}
