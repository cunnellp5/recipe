import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder
    ) {
      this.createForm();
     }

  createForm() {
    this.registerForm = this._fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this._authService.doFacebookLogin()
    .then(res => {
      this._router.navigate(['/user']);
    }, err => console.log(err));
  }

  tryGoogleLogin() {
    this._authService.doGoogleLogin()
    .then(res => {
      this._router.navigate(['/user']);
    }, err => console.log(err));
  }

  tryRegister(value) {
    this._authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }


}
