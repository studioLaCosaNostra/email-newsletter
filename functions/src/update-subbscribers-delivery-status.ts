import { DELIVERY } from "./constants";

export async function updateSubscribersDeliveryStatus(
  subscribers: FirebaseFirestore.QuerySnapshot,
  deliveryId: string,
  isDelivered: boolean
) {
  for (let index = 0; index < subscribers.size; index++) {
    const subscriberDocumentSnapshot = subscribers.docs[index];
    await subscriberDocumentSnapshot.ref.update({
      [`${DELIVERY}.${deliveryId}`]: isDelivered
    });
  }
} 