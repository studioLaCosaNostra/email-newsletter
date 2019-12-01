import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { NewsletterMessageComponent } from './newsletter-message.component';

describe('NewsletterMessageComponent', () => {
  let component: NewsletterMessageComponent;
  let fixture: ComponentFixture<NewsletterMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
