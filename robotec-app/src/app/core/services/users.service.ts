import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersUrl;
  token: string;

  constructor(private http: ApiService) {
    this.usersUrl = 'users'
  }

  httpOptions = {
    headers: new HttpHeaders({
    'Conten-Type': 'application/json',
    'auth': JSON.parse(localStorage.getItem('userLogged')).token
    })
  }

  getAllUsers(){
    return this.http.get(this.usersUrl, this.httpOptions);
  }

  getUserById(id){
    return this.http.get(this.usersUrl+'/'+id, this.httpOptions)
  }

  registerUser(user){
    return this.http.post(this.usersUrl, user, this.httpOptions);
  }

  deleteUser(id){
    return this.http.delete(this.usersUrl+'/'+id, this.httpOptions)
  }

  editUser(id, user){
    return this.http.patch(this.usersUrl+'/'+id, user, this.httpOptions);
  }
  
}
