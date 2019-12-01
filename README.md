# NewsletterApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Setup firebase functions config

```bash
firebase functions:config:set \
  newsletter-invitations.transport.auth.user="email.newsletter.web.app@gmail.com" \
  newsletter-invitations.transport.auth.pass="password123" \
  newsletter-invitations.transport.service="gmail" \
  newsletter-invitations.from="email.newsletter.web.app@gmail.com"
```

# Deploy

Login to firebase

```bash
npx -p firebase-tools firebase login
```

Build & Deploy

```bash
npm run deploy
```


# TODOs

TODO 1 Better content on homepage
TODO 1 Add paypal and payment system
TODO 3 Add dev blog and marketing blog
TODO 2 Forms: move subscribe function to @email-newsletter/subscribe
TODO 2 Create exit intent popup form
TODO 2 Add infinite scroll to lists https://alligator.io/angular/infinite-scroll/
TODO 1 fix tests in cloud functions
TODO 2 add remove user role email notification
TODO 2 <internet-connection>content</internet-connection>
TODO 1 Better settings transport ui
TODO 3 Email open tracking
TODO 1 Add concourse ci