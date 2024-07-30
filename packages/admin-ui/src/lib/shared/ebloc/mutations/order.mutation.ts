import { graphql } from '../codegen';

export const MarkOrderAsShippedMutation = graphql(`
  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {
    markOrderAsShipped(id: $id, input: $input) {
      order {
        ...CommonOrder
      }
      apiErrors {
        code
        message
      }
    }
  }
`);

export const MarkOrderAsDeliveredMutation = graphql(`
  mutation MarkOrderAsDelivered($id: ID!) {
    markOrderAsDelivered(id: $id) {
      order {
        ...CommonOrder
      }
      apiErrors {
        code
        message
      }
    }
  }
`);
