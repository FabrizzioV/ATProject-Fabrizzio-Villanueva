import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configUrl } from '../../config/url.config';
import { Country } from '../../entities/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) {
  }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(configUrl.url+"/paises");
  }
}
