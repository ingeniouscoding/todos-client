import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from '@todos/auth/actions';
import * as fromAuth from '@todos/auth/reducers';

@Component({
  selector: 'app-layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent {
  public isAuth$ = this.store.select(fromAuth.selectIsAuthenticated);

  constructor(private store: Store) { }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
