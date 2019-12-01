import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SubscribeService } from './subscribe.service';

@Component({
  selector: 'lib-newsletter-subscribe-form',
  templateUrl: './newsletter-subscribe-form.component.html',
  styleUrls: ['./newsletter-subscribe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterSubscribeFormComponent {
  @Input() newsletter: string;
  @Output() subscribe = new EventEmitter<string>();

  subscriberForm = this.formBuilder.group({
    email: ['', Validators.email]
  });

  submitted = false;
  submitButtonText = 'Subscribe';

  constructor(
    private formBuilder: FormBuilder,
    private subscribeService: SubscribeService,
    private changeDetectionReference: ChangeDetectorRef
  ) { }

  get email() { return this.subscriberForm.get('email'); }

  onSubmit() {
    if (this.submitted) {
      return;
    }
    if (!this.newsletter) {
      throw new Error('Missing newsletter id.');
    }
    if (this.subscriberForm.invalid) {
      return;
    }
    const email: string = this.subscriberForm.value.email;
    if (!email) {
      return;
    }
    this.subscribeService
      .subscribe(this.newsletter, email)
      .subscribe(() => {
        this.submitted = true;
        this.submitButtonText = 'Thanks <3';
        this.changeDetectionReference.markForCheck();
        this.subscribe.emit(email);
      });
  }
}
