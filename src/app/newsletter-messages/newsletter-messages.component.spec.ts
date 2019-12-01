import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NewsletterMessagesComponent } from './newsletter-messages.component';

describe('NewsletterMessagesComponent', () => {
  let component: NewsletterMessagesComponent;
  let fixture: ComponentFixture<NewsletterMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
