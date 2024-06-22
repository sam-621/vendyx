import { graphql } from '../codegen';

export const markOrderAsShippedMutation = graphql(`
  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput) {
    markOrderAsShipped(id: $id, input: $input) {
      ...CommonOrder
    }
  }
`);

export const markOrderAsDeliveredMutation = graphql(`
  mutation MarkOrderAsDelivered($id: ID!) {
    markOrderAsDelivered(id: $id) {
      ...CommonOrder
    }
  }
`);
