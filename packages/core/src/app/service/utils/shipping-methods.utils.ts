import { ConfigurableProperty } from '@/app/persistance';

/**
 * Convert ConfigurableProperty args to object.
 */
export const convertArgsToObject = (args: ConfigurableProperty['args']) =>
  args.reduce((acc, arg) => ({ ...acc, [arg.key]: arg.value }), {});
