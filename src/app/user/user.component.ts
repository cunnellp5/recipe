import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, RouteConfigLoadStart } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {
  user: FirebaseUserModel = new FirebaseUserModel;
  profileForm: FormGroup;

  constructor(
    public _userService: UserService,
    public _authService: AuthService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _fb: FormBuilder
  ) { }

  ngOnChanges() {
    console.log(this.user, 'onchanges');
  }

  ngOnInit(): void {
    this._route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
  }

  createForm(name) {
    this.profileForm = this._fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this._userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err));
  }

  logout() {
    this._authService.doLogout()
    .then((res) => {
      this._location.back();
    }, (error) => {
      console.log('Loutout error', error);
    });
  }

}
