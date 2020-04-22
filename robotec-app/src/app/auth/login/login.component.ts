import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleLogin(){
    console.log("Go to dashboard in here!")
    this.router.navigate(['pages'], { replaceUrl: true });
  }

}
