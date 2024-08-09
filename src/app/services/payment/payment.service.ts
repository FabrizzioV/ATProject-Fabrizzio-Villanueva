import { Injectable } from '@angular/core';
import { PaymentMethod } from '../../entities/paymentMethod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { configUrl } from '../../config/url.config';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) {
  }

  getPaymentMethods(): Observable<PaymentMethod[]>{
    return this.http.get<PaymentMethod[]>(configUrl.url+"/pagos");
  }
}
