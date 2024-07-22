import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 17);

/**
 * Generate a readable unique id
 *
 * @description
 * Thw id generated uses nano id with a custom alphabet and a length of 17 characters.
 *
 * ~36 million years or 319T IDs needed, in order to have a 1% probability of at least one collision according to https://zelark.github.io/nano-id-cc/
 */
export function generateReadableId(): string {
  return nanoid();
}
