import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hidePassword = true;
  bRegister = false;
  userLogged: any;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(localStorage.getItem('userLogged'));
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  checkingInputEmail(){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(this.registerForm.get('email').value)){
      return true;
    }
    else{
      return false;
    }
  }

  handleRegister(){
    this.bRegister = true;

    let user = {
      "firstName": this.registerForm.get('firstName').value,
      "lastName": this.registerForm.get('lastName').value,
      "email": this.registerForm.get('email').value,
      "password": this.registerForm.get('password').value
    }
    
    this.usersService.registerUser(user)
    .subscribe(
      res => {
        this.bRegister = false;
        console.log(res);
        this.openSnackBar('Registro de usuario exitoso!');
        this.router.navigate(['pages/dashboard'], { replaceUrl: true });
      },
      err => {
        this.bRegister = false;
        console.log(err);
        this.openSnackBar(err.error);

      }
    );
  }

}
