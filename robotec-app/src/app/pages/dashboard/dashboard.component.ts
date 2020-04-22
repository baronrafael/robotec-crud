import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userLogged: any;
  usersList: any;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('userLogged'));
    //console.log(this.userLogged);
    this.getUsersList();
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
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

  goToEditUser(id){
    this.router.navigate(['pages/edit', id]);
  }

  deleteUser(id){
    if(id == this.userLogged.user_id){
      this.openSnackBar('No puedes eliminarte a ti mismo!!');
      return;
    }
    else{
      this.usersService.deleteUser(id)
      .subscribe(
        res => {
          //console.log(res);
          this.getUsersList();
        },
        err => {
          console.log(err.error);
        }
      );
    }
  }

}
