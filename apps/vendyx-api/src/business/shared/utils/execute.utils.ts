/**
 * Wraps a function in a try/catch block and logs any errors that occur.
 */
export const executeInSafe = async <R = void>(fn: () => Promise<R>): Promise<R | null> => {
  try {
    return await fn();
  } catch (error) {
    console.log({
      error
    });

    return null;
  }
};
