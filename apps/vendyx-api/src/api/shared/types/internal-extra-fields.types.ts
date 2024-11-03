/*
  This file contains types that are used to be passed via Fields in @ResolveField
  These are used to pass extra information like where the data is coming from

  These properties are not exposed to the client
*/

export type FromOrders = {
  fromOrders: boolean;
};
