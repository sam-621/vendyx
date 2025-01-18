import { CREATE_CHECKOUT_SESSION_MUTATION } from '../operations/subscription.operations';
import { type CreateCheckoutSessionInput } from '../types';
import { serviceGqlFetcher } from './service-fetchers/service-gql-fetchers';

export const SubscriptionService = {
  async createCheckoutSession(input: CreateCheckoutSessionInput) {
    const { createCheckoutSession } = await serviceGqlFetcher(CREATE_CHECKOUT_SESSION_MUTATION, {
      input
    });

    return createCheckoutSession;
  }
};
