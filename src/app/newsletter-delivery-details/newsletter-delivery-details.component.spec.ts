import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterDeliveryDetailsComponent } from './newsletter-delivery-details.component';

describe('NewsletterDeliveryDetailsComponent', () => {
  let component: NewsletterDeliveryDetailsComponent;
  let fixture: ComponentFixture<NewsletterDeliveryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterDeliveryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterDeliveryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
