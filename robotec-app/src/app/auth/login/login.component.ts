import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  bSignIn = false;

  signInForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['rafael@hotmail.com', Validators.required],
      password: ['12345', Validators.required],
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  checkingInputEmail(){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(this.signInForm.get('email').value)){
      return true;
    }
    else{
      return false;
    }
  }

  handleLogin(){
    this.bSignIn = true;
    console.log(this.signInForm.value);

    let user = {
      "email": this.signInForm.get('email').value,
      "password": this.signInForm.get('password').value
    }
    
    this.authService.login(user)
    .subscribe(
      res => {
        this.bSignIn = false;
        //console.log(res);
        localStorage.setItem('userLogged', JSON.stringify(res));
        this.openSnackBar('Inicio de sesión exitoso!');
        this.router.navigate(['pages'], { replaceUrl: true });
      },
      err => {
        this.bSignIn = false;
        //console.log(err.error);
        this.openSnackBar(err.error);

      }
    );
    //this.router.navigate(['pages'], { replaceUrl: true });
  }

}
