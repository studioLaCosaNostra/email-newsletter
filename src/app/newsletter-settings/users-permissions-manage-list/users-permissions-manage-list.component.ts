import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  deleteUserRoleAction,
  setUserRoleAction,
  watchNewsletterInvitedUsersAction,
  watchNewsletterUsersRolesAction
} from 'src/app/actions/newsletters.actions';
import { getNewsletterInvitedUsers, getNewsletterUsersRoles, withId } from 'src/app/selectors/newsletters.selectors';
import { switchMap, tap } from 'rxjs/operators';

import { ApplicationState } from 'src/app/reducers';
import { User } from 'src/app/reducers/auth.reducer';
import { UserInvitation } from 'functions/src/interfaces/user-invitation';
import { UserRole } from 'functions/src/interfaces/user-role';
import { truthy } from 'src/app/operators';

@Component({
  selector: 'app-users-permissions-manage-list',
  templateUrl: './users-permissions-manage-list.component.html',
  styleUrls: ['./users-permissions-manage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPermissionsManageListComponent implements OnInit {
  @Input() newsletter: string;
  users$: Observable<withId<UserRole>[]>;
  invitedUsers$: Observable<withId<UserInvitation>[]>;

  inviteForm: FormGroup = this.formBuilder.group({
    email: '',
    role: 'member'
  });

  constructor(
    private store: Store<ApplicationState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.users$ = of(this.newsletter).pipe(
      tap(id => this.store.dispatch(watchNewsletterUsersRolesAction({ id }))),
      switchMap(id => this.store.pipe(select(getNewsletterUsersRoles(id)))),
      truthy()
    );

    this.invitedUsers$ = of(this.newsletter).pipe(
      tap(id => this.store.dispatch(watchNewsletterInvitedUsersAction({ id }))),
      switchMap(id => this.store.pipe(select(getNewsletterInvitedUsers(id)))),
      truthy()
    );
  }

  onRoleChange(selection: any, user: User) {
    this.store.dispatch(setUserRoleAction({
      id: this.newsletter,
      email: user.email,
      role: selection.target.value
    }));
  }

  onInvite(event: any, inviteForm: any) {
    event.stopPropagation();
    this.store.dispatch(setUserRoleAction({
      id: this.newsletter,
      email: inviteForm.email,
      role: inviteForm.role
    }));
  }

  onDelete(email: string) {
    this.store.dispatch(deleteUserRoleAction({
      id: this.newsletter,
      email
    }));
  }
}
