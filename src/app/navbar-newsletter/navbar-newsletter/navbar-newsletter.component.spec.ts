import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNewsletterComponent } from './navbar-newsletter.component';

describe('NavbarNewsletterComponent', () => {
  let component: NavbarNewsletterComponent;
  let fixture: ComponentFixture<NavbarNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
