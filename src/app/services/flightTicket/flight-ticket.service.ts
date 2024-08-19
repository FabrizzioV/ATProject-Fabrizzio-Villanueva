import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configUrl } from '../../config/url.config';
import { Ticket } from '../../entities/ticket';
import { FlightTicket } from '../../entities/flightTicket';

@Injectable({
  providedIn: 'root'
})
export class FlightTicketService {

  constructor(private http:HttpClient) {
  }

  getFlightTicket(id:number): Observable<FlightTicket[]>{
    return this.http.get<FlightTicket[]>(configUrl.url+"/ticket/"+id);
  }

  createFlightTicket(flightTicket:Ticket, paymentMethodId: number): Observable<Ticket>{
    return this.http.post<Ticket>(configUrl.url+"/crear-ticket/"+paymentMethodId,flightTicket);
  }
}
