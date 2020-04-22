import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userLogged: any;
  usersList: any;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('userLogged'));
    //console.log(this.userLogged);
    this.getUsersList();
  }

  getUsersList(){
    this.usersService.getAllUsers()
    .subscribe(
      res => {
        //console.log(res);
        this.usersList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

}
