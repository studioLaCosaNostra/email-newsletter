import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterDeliveryComponent } from './newsletter-delivery.component';

describe('NewsletterDeliveryComponent', () => {
  let component: NewsletterDeliveryComponent;
  let fixture: ComponentFixture<NewsletterDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsletterDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
