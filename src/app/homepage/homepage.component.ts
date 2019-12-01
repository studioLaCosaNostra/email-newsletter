import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.title.setTitle('Start your adventure with email marketing | Email newsletter');
    this.meta.updateTag({
      name: 'description',
      content: 'Email newsletter is the cheapest form of advertising. Try it today, 5,000 sent emails for free'
    });
  }
}
