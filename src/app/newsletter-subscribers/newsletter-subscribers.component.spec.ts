import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSubscribersComponent } from './newsletter-subscribers.component';

describe('NewsletterSubscribersComponent', () => {
  let component: NewsletterSubscribersComponent;
  let fixture: ComponentFixture<NewsletterSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
