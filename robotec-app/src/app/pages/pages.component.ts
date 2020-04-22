import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  userLogged: any;
  userInfo: any;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this.getUserInfo();
  }

  goToDashboard(){
    this.router.navigate(['pages/dashboard']);
  }

  goToRegister(){
    this.router.navigate(['pages/register']);
  }

  getUserInfo(){
    this.usersService.getUserById(this.userLogged.user_id)
    .subscribe(
      res => {
        //console.log(res);
        this.userInfo = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

}
