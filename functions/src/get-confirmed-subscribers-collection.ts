import { SUBSCRIBERS } from "./constants";

export function getConfirmedSubscribersCollection(newsletterRef: FirebaseFirestore.DocumentReference) {
  return newsletterRef.collection(SUBSCRIBERS).where('confirmed', '==', true);
}
