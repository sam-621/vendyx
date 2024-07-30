import { OrderErrorCode, type OrderErrorResult } from '../codegen/graphql';
import { CommonErrorMessages } from './common.errors';

export const getOrderErrorMessages = (error?: OrderErrorResult) => {
  if (!error) {
    return '';
  }

  if (error.code === OrderErrorCode.OrderNotFound) {
    return OptionErrorMessage.NotFound;
  }

  if (error.code === OrderErrorCode.OrderTransitionError) {
    return OptionErrorMessage.OrderTransitionError;
  }

  return CommonErrorMessages.GenericError;
};

const OptionErrorMessage = {
  NotFound: 'Order not found',
  OrderTransitionError: 'Can not transition order to the requested state'
};
