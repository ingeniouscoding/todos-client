import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthActions } from 'src/app/auth/actions';
import * as fromAuth from 'src/app/auth/reducers';

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
