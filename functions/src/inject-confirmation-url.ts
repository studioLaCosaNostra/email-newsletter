import { CONFIRM_URL } from "./constants"

export function injectConfirmUrl(newsletterId: string, email: string, confirmationUrlSignature: string, token: string) {
  const confirmationUrl = `${CONFIRM_URL}?newsletter=${newsletterId}&email=${email}&token=${token}`;
  return (text: string) => text.replace(confirmationUrlSignature, confirmationUrl);
}
