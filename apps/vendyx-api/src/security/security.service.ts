import * as crypto from 'node:crypto';

import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@/config/config.service';

type Password = string | Buffer | NodeJS.TypedArray | DataView;

@Injectable()
export class SecurityService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Encrypt AES 256 GCM
   * @param plainText
   * @param password
   */
  encrypt(text: string | object): string | undefined {
    try {
      const password = this.configService.get('SECURITY.ENCRYPT_PASSWORD');
      const plainText = typeof text === 'object' ? JSON.stringify(text) : String(text);
      const algorithm: crypto.CipherGCMTypes = this.getAlgorithm();

      // Generate random salt -> 64 bytes
      const salt = crypto.randomBytes(64);

      // Generate random initialization vector -> 16 bytes
      const iv = crypto.randomBytes(16);

      // Generate random count of iterations between 10.000 - 99.999 -> 5 bytes
      const iterations = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

      // Derive encryption key
      const encryptionKey = this.deriveKeyFromPassword(
        password,
        salt,
        Math.floor(iterations * 0.47 + 1337)
      );

      // Create cipher
      const cipher: crypto.CipherGCM = crypto.createCipheriv(algorithm, encryptionKey, iv);

      // Update the cipher with data to be encrypted and close cipher
      const encryptedData = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);

      // Get authTag from cipher for decryption // 16 bytes
      const authTag = cipher.getAuthTag();

      // Join all data into single string, include requirements for decryption
      const output = Buffer.concat([
        salt,
        iv,
        authTag,
        Buffer.from(iterations.toString()),
        encryptedData
      ]).toString('hex');

      return this.getEncryptedPrefix() + output;
    } catch (error) {
      Logger.error({
        type: 'SECURITY ERROR',
        message: 'Could not encrypt input '
      });

      return undefined;
    }
  }

  /**
   * Decrypt AES 256 GCM
   * @param cipherText
   * @param password
   */
  decrypt<R>(inputText: string): R | undefined {
    try {
      const password = this.configService.get('SECURITY.ENCRYPT_PASSWORD');

      const algorithm: crypto.CipherGCMTypes = this.getAlgorithm();
      const cipherTextParts = inputText.split(this.getEncryptedPrefix());
      // If it's not encrypted by this, reject with undefined
      if (cipherTextParts.length !== 2) {
        console.error(
          'Could not determine the beginning of the cipherText. Maybe not encrypted by this method.'
        );
        return undefined;
      }
      const [, cipherText] = cipherTextParts;
      const inputData: Buffer = Buffer.from(cipherText, 'hex');
      // Split cipherText into partials
      const salt: Buffer = inputData.subarray(0, 64);
      const iv: Buffer = inputData.subarray(64, 80);
      const authTag: Buffer = inputData.subarray(80, 96);
      const iterations: number = parseInt(inputData.subarray(96, 101).toString('utf-8'), 10);
      const encryptedData: Buffer = inputData.subarray(101);

      // Derive key
      const decryptionKey = this.deriveKeyFromPassword(
        password,
        salt,
        Math.floor(iterations * 0.47 + 1337)
      );
      // Create decipher
      const decipher: crypto.DecipherGCM = crypto.createDecipheriv(algorithm, decryptionKey, iv);
      decipher.setAuthTag(authTag);

      // Decrypt data
      const decrypted =
        decipher.update(encryptedData, undefined, 'utf-8') + decipher.final('utf-8');

      try {
        return JSON.parse(decrypted) as R;
      } catch (error) {
        return decrypted as R;
      }
    } catch (error) {
      Logger.error({
        type: 'DECRYPTION ERROR',
        message: 'Could not decrypt input'
      });

      return undefined;
    }
  }

  private getAlgorithm(): crypto.CipherGCMTypes {
    return this.configService.get('SECURITY.ENCRYPT_ALGORITHM');
  }

  private getEncryptedPrefix(): string {
    return 'enc::';
  }

  private deriveKeyFromPassword(password: Password, salt: Buffer, iterations: number): Buffer {
    return crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha512');
  }
}
