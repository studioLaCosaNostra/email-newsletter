import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNewsletterComponent } from './new-newsletter.component';

describe('NewNewsletterComponent', () => {
  let component: NewNewsletterComponent;
  let fixture: ComponentFixture<NewNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
