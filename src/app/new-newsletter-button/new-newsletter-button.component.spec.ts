import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNewsletterButtonComponent } from './new-newsletter-button.component';

describe('NewNewsletterButtonComponent', () => {
  let component: NewNewsletterButtonComponent;
  let fixture: ComponentFixture<NewNewsletterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNewsletterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNewsletterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
