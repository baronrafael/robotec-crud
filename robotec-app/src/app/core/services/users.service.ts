import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersUrl;

  httpOptions = {
    headers: new HttpHeaders({
    'Conten-Type': 'application/json'
    })
  }

  constructor(private http: ApiService) {
    this.usersUrl = 'users'
  }

  getAllUsers(){
    return this.http.get(this.usersUrl, this.httpOptions);
  }

  getUserById(id){
    return this.http.get(this.usersUrl+'/'+id, this.httpOptions)
  }
  
}
