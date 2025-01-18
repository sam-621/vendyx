import { gqlFetcher } from '../fetchers/gql-fetcher';
import { CREATE_CHECKOUT_SESSION_MUTATION } from '../operations/subscription.operations';
import { type CreateCheckoutSessionInput } from '../types';

export class SubscriptionService {
  static async createCheckoutSession(input: CreateCheckoutSessionInput) {
    const { createCheckoutSession } = await gqlFetcher(CREATE_CHECKOUT_SESSION_MUTATION, { input });

    return createCheckoutSession;
  }
}
