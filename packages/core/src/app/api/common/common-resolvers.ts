import {
  CollectionCommonResolver,
  CustomerCommonResolver,
  OptionCommonResolver,
  OptionValueCommonResolver,
  OrderCommonResolver,
  OrderLineCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver
} from './resolvers';

export const COMMON_RESOLVERS = [
  OrderLineCommonResolver,
  OrderCommonResolver,
  ProductCommonResolver,
  VariantCommonResolver,
  OptionValueCommonResolver,
  OptionCommonResolver,
  CustomerCommonResolver,
  CollectionCommonResolver
];
