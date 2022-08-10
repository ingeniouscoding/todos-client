import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import { RegisterPageActions } from '../../actions';
import { RegisterCredentials } from '../../models';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  public fg = this.fb.group({
    name: '',
    email: '',
    password: '',
  });

  constructor(private store: Store, private fb: NonNullableFormBuilder) { }

  onRegister() {
    const credentials: RegisterCredentials = this.fg.getRawValue();
    this.store.dispatch(RegisterPageActions.register({ credentials }));
  }
}
