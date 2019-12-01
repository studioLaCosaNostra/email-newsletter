import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPermissionsManageListComponent } from './users-permissions-manage-list.component';

describe('UsersPermissionsManageListComponent', () => {
  let component: UsersPermissionsManageListComponent;
  let fixture: ComponentFixture<UsersPermissionsManageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPermissionsManageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPermissionsManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
