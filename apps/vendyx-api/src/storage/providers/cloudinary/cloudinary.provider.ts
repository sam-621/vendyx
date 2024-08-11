import { v2 } from 'cloudinary';

const CLOUDINARY_CLOUD_NAME = 'dnvp4s8pe';
const CLOUDINARY_API_KEY = '224627828215865';
const CLOUDINARY_API_SECRET = 'eos_1HKoJaRp7beDXp7s2Jh_2LM';

export const CLOUDINARY_PROVIDER_KEY = 'CLOUDINARY';

export const CloudinaryProvider = {
  provide: CLOUDINARY_PROVIDER_KEY,
  useFactory: () => {
    return v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET
    });
  }
};
