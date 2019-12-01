import { Component, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../reducers';
import { createNewsletterAction } from '../actions/newsletters.actions';
import { generateInitalSettingsUpdate } from '../newsletter-settings/generate-initial-settings';

@Component({
  selector: 'app-new-newsletter',
  templateUrl: './new-newsletter.component.html',
  styleUrls: ['./new-newsletter.component.css']
})
export class NewNewsletterComponent {
  @ViewChild('newsletterName', { static: true }) newsletterName: ElementRef;
  constructor(private store: Store<ApplicationState>) { }

  async createNewNewsletter() {
    const name = this.newsletterName.nativeElement.value;
    if (!name) {
      return;
    }
    const settings = await generateInitalSettingsUpdate();
    this.store.dispatch(createNewsletterAction({ name, settings }));
  }

}
