import crypto, { CipherGCM, CipherGCMTypes, DecipherGCM } from 'crypto';

import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@/config/config.service';

@Injectable()
export class SecurityService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Encrypt AES 256 GCM
   * @param plainText
   * @param password
   */
  encrypt(input: string | object): string | null {
    try {
      const password = this.getPassword();

      const plainText = typeof input === 'object' ? JSON.stringify(input) : String(input);
      const algorithm = this.getAlgorithm();

      const salt = this.genSalt();
      const iv = this.genIv();
      const iterations = this.genIterations();

      const encryptionKey = this.deriveKeyFromPassword(password, salt, iterations);
      const cipher = this.genCipher(algorithm, encryptionKey, iv);
      const encryptedData = this.encryptData(cipher, plainText);

      const authTag = this.genAuthTag(cipher);

      const output = this.buildEncryptedPayload(salt, iv, authTag, iterations, encryptedData);

      return this.getEncryptedPrefix() + output;
    } catch (error) {
      console.log(error);
      Logger.error({
        type: 'ENCRYPTION_ERROR'
      });

      return null;
    }
  }

  /**
   * Decrypt AES 256 GCM
   */
  decrypt<R>(encryption: string): R | null {
    try {
      const password = this.getPassword();

      const algorithm: CipherGCMTypes = this.getAlgorithm();
      const [, cipherText] = encryption.split(this.getEncryptedPrefix());

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

      const decipher = this.getDecipher(algorithm, decryptionKey, iv);
      decipher.setAuthTag(authTag);

      // Decrypt data
      const decrypted = this.decryptData(decipher, encryptedData);

      try {
        return JSON.parse(decrypted) as R;
      } catch (error) {
        return decrypted as R;
      }
    } catch (error) {
      console.log(error);

      Logger.error({
        type: 'DECRYPTION_ERROR'
      });

      return null;
    }
  }

  /**
   * Derive 256 bit encryption key from password, using salt and iterations -> 32 bytes
   */
  private deriveKeyFromPassword(password: string, salt: Buffer, iterations: number): Buffer {
    const digest = this.getDigestAlgorithm();
    const keyLength = this.getKeyLength();

    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
  }

  private getDecipher(algorithm: CipherGCMTypes, decryptionKey: Buffer, iv: Buffer) {
    return crypto.createDecipheriv(algorithm, decryptionKey, iv);
  }

  private genCipher(algorithm: CipherGCMTypes, encryptionKey: Buffer, iv: Buffer): CipherGCM {
    return crypto.createCipheriv(algorithm, encryptionKey, iv);
  }

  /**
   * Update the cipher with data to be encrypted and close cipher
   */
  private encryptData(cipher: CipherGCM, plainText: string): Buffer {
    return Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  }

  /**
   * Get authTag from cipher for decryption // 16 bytes
   */
  private genAuthTag(cipher: CipherGCM): Buffer {
    return cipher.getAuthTag();
  }

  /**
   * Decrypt data using decipher
   */
  private decryptData(decipher: DecipherGCM, encryptedData: Buffer): string {
    return decipher.update(encryptedData, undefined, 'utf-8') + decipher.final('utf-8');
  }

  /**
   * Join all data into single string, include requirements for decryption
   */
  private buildEncryptedPayload(
    salt: Buffer,
    iv: Buffer,
    authTag: Buffer,
    iterations: number,
    encryptedData: Buffer
  ): string {
    return Buffer.concat([
      salt,
      iv,
      authTag,
      Buffer.from(iterations.toString()),
      encryptedData
    ]).toString('hex');
  }

  private getPassword() {
    return this.configService.get('SECURITY.ENCRYPT_PASSWORD');
  }

  private getAlgorithm(): CipherGCMTypes {
    return this.configService.get('SECURITY.ENCRYPT_ALGORITHM');
  }

  private getDigestAlgorithm(): string {
    return 'sha256';
  }

  private getEncryptedPrefix(): string {
    return 'enc::';
  }

  private getKeyLength(): number {
    return 32;
  }

  private genSalt(): Buffer {
    return crypto.randomBytes(64);
  }

  private genIv() {
    return crypto.randomBytes(16);
  }

  private genIterations(): number {
    return this.configService.get('SECURITY.PBKDF2_ITERATIONS');
  }
}
