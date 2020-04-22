import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl;

  httpOptions = {
    headers: new HttpHeaders({
    'Conten-Type': 'application/json'
    })
  }

  constructor(private http: ApiService) {
    this.authUrl = 'auth'
  }

  login(user){
    return this.http.post(this.authUrl+'/login', user, this.httpOptions)
  }
  
}
