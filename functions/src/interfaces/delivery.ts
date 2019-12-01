import { DeliveryMessage } from './delivery-message';
import { DeliveryStatus } from '../enums/delivery-status';

export interface Delivery {
  readonly newsletterId: string;
  readonly message: DeliveryMessage;
  readonly status: DeliveryStatus;
  // TODO 2 add canceled function to frontend
  readonly canceled: boolean;
  readonly createdAt: number;
}