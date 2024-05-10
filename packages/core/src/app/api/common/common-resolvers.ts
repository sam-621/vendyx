import {
  OrderCommonResolver,
  OrderLineCommonResolver,
  PaymentCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver,
} from './resolvers';

export const COMMON_RESOLVERS = [
  OrderLineCommonResolver,
  OrderCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver,
  PaymentCommonResolver,
];
