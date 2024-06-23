import { EBlocPluginMetadataKeys } from './ebloc.plugin';

export const getPluginMetadata = <T>(key: EBlocPluginMetadataKeys, target: any): T => {
  return Reflect.getMetadata(key, target) as T;
};
