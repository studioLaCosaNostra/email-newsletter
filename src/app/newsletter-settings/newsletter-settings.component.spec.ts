import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSettingsComponent } from './newsletter-settings.component';

describe('NewsletterSettingsComponent', () => {
  let component: NewsletterSettingsComponent;
  let fixture: ComponentFixture<NewsletterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
