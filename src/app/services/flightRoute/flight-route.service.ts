import { Injectable } from '@angular/core';
import { FlightRoute } from '../../entities/flightRoute';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configUrl } from '../../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class FlightRouteService {

  constructor(private http:HttpClient) {
  }

  getFlightRoute(flightRoute: FlightRoute): Observable<FlightRoute[]>{
    return this.http.post<FlightRoute[]>(configUrl.url+"/rutas",flightRoute);
  }

  getFlight(id: number): Observable<FlightRoute>{
    return this.http.get<FlightRoute>(configUrl.url+"/rutas/"+id);
  }
}
