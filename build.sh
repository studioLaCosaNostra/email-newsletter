#!/bin/bash
set -ex

function build_newsletter_subscribe_form {
  ng build @email-newsletter/newsletter-subscribe-form
  APP=newsletter-subscribe-form-element
  ng build $APP --prod --single-bundle --output-hashing=none
  BUILD_PATH=dist/email-newsletter/newsletter-subscribe-form/custom-element
  mkdir -p $BUILD_PATH
  cp dist/$APP/{main,polyfill-webcomp,polyfills}-es5.js $BUILD_PATH
  cp dist/$APP/{main,polyfills}-es2015.js $BUILD_PATH
  cp dist/$APP/polyfill-webcomp.js $BUILD_PATH
}

build_newsletter_subscribe_form
npm run build:ssr
npm run prerender