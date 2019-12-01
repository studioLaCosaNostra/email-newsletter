#!/bin/bash
set -x

function deploy_newsletter_subscribe_form {
  local pwd_before=$(pwd)
  cd dist/email-newsletter/newsletter-subscribe-form
  npm publish
  cd $pwd_before
}

deploy_newsletter_subscribe_form
npx -p firebase-tools firebase deploy # deploy main project