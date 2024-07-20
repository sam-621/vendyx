import { EBlocPluginMetadataKeys, GraphqlApiExtension } from './ebloc.plugin';
import { getConfig } from '../config';

export const getPluginMetadata = <T>(key: EBlocPluginMetadataKeys, target: any): T => {
  return Reflect.getMetadata(key, target) as T;
};

export const getPluginTypePaths = (type: 'admin' | 'storefront') => {
  const { plugins } = getConfig();

  const apiExtensions = plugins
    .map(p =>
      getPluginMetadata<GraphqlApiExtension>(
        EBlocPluginMetadataKeys[
          type === 'admin' ? 'ADMIN_API_EXTENSIONS' : 'STOREFRONT_API_EXTENSIONS'
        ],
        p
      )
    )
    .filter(apiExtension => apiExtension);

  const extensionsTypePaths = apiExtensions.map(apiExtension => apiExtension.typePaths).flat();
  console.log({
    extensionsTypePaths
  });

  return extensionsTypePaths;
};

export const getPluginResolvers = (type: 'admin' | 'storefront') => {
  const { plugins } = getConfig();

  const apiExtensions = plugins
    .map(p =>
      getPluginMetadata<GraphqlApiExtension>(
        EBlocPluginMetadataKeys[
          type === 'admin' ? 'ADMIN_API_EXTENSIONS' : 'STOREFRONT_API_EXTENSIONS'
        ],
        p
      )
    )
    .filter(apiExtension => apiExtension);

  const extensionsResolvers = apiExtensions.map(apiExtension => apiExtension.resolvers).flat();

  return extensionsResolvers;
};
