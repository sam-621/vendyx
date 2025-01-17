import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  VENDYX_ADMIN_DOMAIN: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;

  @IsString()
  @IsNotEmpty()
  CLOUDINARY_CLOUD_NAME: string;

  @IsString()
  @IsNotEmpty()
  CLOUDINARY_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  CLOUDINARY_API_SECRET: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_SECRET_KEY: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_WEBHOOK_SIGNING_SECRET: string;

  @IsString()
  @IsNotEmpty()
  SENDGRID_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  ENCRYPT_ALGORITHM: string;

  @IsString()
  @IsNotEmpty()
  ENCRYPT_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_BASIC_PRODUCT_ID: string;

  @IsString()
  @IsNotEmpty()
  STRIPE_ESSENTIAL_PRODUCT_ID: string;
}

export const environmentValidator = (config: Record<string, unknown>) => {
  const configClass = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });

  const errors = validateSync(configClass, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed: ${errors.toString()}`);
  }

  return configClass;
};
