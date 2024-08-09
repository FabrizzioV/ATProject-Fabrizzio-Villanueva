import { Injectable } from '@angular/core';
import { User } from '../../entities/user';
import { configUrl } from '../../config/url.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
  }

  createUser(user:User): Observable<User[]>{
    return this.http.post<User[]>(configUrl.url+"/usuario",user);
  }

  getUser(id:number): Observable<User[]>{
    return this.http.get<User[]>(configUrl.url+"/usuario/"+id);
  }
}
