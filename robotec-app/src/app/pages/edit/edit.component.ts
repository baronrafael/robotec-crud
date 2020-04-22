import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: number;
  private sub: any;
  userInfo: any;

  hidePassword = true;
  bEdit = false;

  userLogged: any;
  editForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getUserInfo(this.id);
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  getUserInfo(id){
    this.usersService.getUserById(id)
    .subscribe(
      res => {
        //console.log(res);
        this.userInfo = res;
        this.editForm = this.formBuilder.group({
          firstName: [this.userInfo.firstName, Validators.required],
          lastName: [this.userInfo.lastName, Validators.required]
        });
      },
      err => {
        console.log(err.error);
      }
    );
  }

  handleEdit(){
    this.bEdit = true;

    let user = {
      "firstName": this.editForm.get('firstName').value,
      "lastName": this.editForm.get('lastName').value,
    }
    
    this.usersService.editUser(this.userInfo.id, user)
    .subscribe(
      res => {
        this.bEdit = false;
        console.log(res);
        this.openSnackBar('Cambio exitoso!');
        this.router.navigate(['pages/dashboard'], { replaceUrl: true });
      },
      err => {
        this.bEdit = false;
        console.log(err);
        this.openSnackBar(err.error);

      }
    );
  }

}
