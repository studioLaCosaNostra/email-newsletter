import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSubscribeFormComponent } from './newsletter-subscribe-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('NewsletterSubscribeFormComponent', () => {
  let component: NewsletterSubscribeFormComponent;
  let fixture: ComponentFixture<NewsletterSubscribeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ NewsletterSubscribeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterSubscribeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
