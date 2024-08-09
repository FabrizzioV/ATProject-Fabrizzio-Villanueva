import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Locations } from '../../entities/locations';
import { Observable } from 'rxjs';
import { configUrl } from '../../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http:HttpClient) {
  }

  getLocations(): Observable<Locations[]>{
    return this.http.get<Locations[]>(configUrl.url+"/destinos");
  }
}