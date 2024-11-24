import { OrderErrorCode, type OrderErrorResult } from '../types';

export const getOrderError = (error?: OrderErrorResult) => {
  if (!error) return null;

  if (error.code === OrderErrorCode.ForbiddenOrderAction) {
    return 'Could not perform this action on the order';
  }

  if (error.code === OrderErrorCode.OrderTransitionError) {
    return 'Could not transition the order to the desired state';
  }

  return 'Something went wrong';
};
