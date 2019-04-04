import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this._authService.doFacebookLogin()
    .then(res => {
      this._router.navigate(['/user']);
    });
  }

  tryGoogleLogin() {
    this._authService.doGoogleLogin()
    .then(res => {
      this._router.navigate(['/user']);
    });
  }

  tryLogin(value) {
    this._authService.doLogin(value)
    .then(res => {
      this._router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
