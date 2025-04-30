import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCountry } from '../interfaces/rest-country';
import { catchError, count, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country';
import { Region } from '../interfaces/region';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private htpp = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query))
      return of(this.queryCacheCapital.get(query) ?? []);

    console.log('http')

    return this.htpp.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((items) => CountryMapper.mapRestCountriesToCountries(items)),
      tap(countriues => this.queryCacheCapital.set(query,countriues)),
      catchError((error) => {
        console.error('Error feching', error);
        return throwError(
          () => new Error('No se pudo obtener países con ese input')
        );
      })
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query))
      return of(this.queryCacheCountry.get(query) ?? []);

    console.log('http')

    return this.htpp.get<RestCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((items) => CountryMapper.mapRestCountriesToCountries(items)),
      tap(countriues => this.queryCacheCountry.set(query,countriues)),
      catchError((error) => {
        console.error('Error feching', error);
        return throwError(
          () => new Error('No se pudo obtener países con ese input')
        );
      })
    );
  }


  searchByRegion(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheRegion.has(query))
      return of(this.queryCacheRegion.get(query) ?? []);

    console.log('http')

    return this.htpp.get<RestCountry[]>(`${API_URL}/region/${query}`).pipe(
      map((items) => CountryMapper.mapRestCountriesToCountries(items)),
      tap(countriues => this.queryCacheRegion.set(query,countriues)),
      catchError((error) => {
        console.error('Error feching \n', error);
        return throwError(
          () => new Error('No se pudo obtener países con ese input')
        );
      })
    );
  }



  searchByAplhaCode(query: string) {
    query = query.toLowerCase();

    return this.htpp.get<RestCountry[]>(`${API_URL}/alpha/${query}`).pipe(
      map((items) => CountryMapper.mapRestCountriesToCountries(items)),
      map((countries) => countries.at(0)),

      catchError((error) => {
        console.error('Error feching', error);
        return throwError(
          () => new Error('No se pudo obtener países con ese input')
        );
      })
    );
  }
}
