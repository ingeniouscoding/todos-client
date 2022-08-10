import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { LoginPageActions } from '../../actions';
import { LoginCredentials } from '../../models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public fg = this.fb.group({
    name: '',
    email: '',
    password: '',
  });

  constructor(private store: Store, private fb: NonNullableFormBuilder) { }

  onLogin() {
    const credentials: LoginCredentials = this.fg.getRawValue();
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
