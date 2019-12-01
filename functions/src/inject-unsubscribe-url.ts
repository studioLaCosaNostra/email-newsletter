import { UNSUBSCRIBE_URL, UNSUBSCRIBE_SIGNATURE } from "./constants"

export function injectUnsubscribeUrl(newsletterId: string, email: string, token: string) {
  const unsubscribeUrl = `${UNSUBSCRIBE_URL}?newsletter=${newsletterId}&email=${email}&token=${token}`;
  return (text: string) => text.replace(UNSUBSCRIBE_SIGNATURE, unsubscribeUrl);
}
