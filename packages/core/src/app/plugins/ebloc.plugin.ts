import { Module, ModuleMetadata } from '@nestjs/common';

/**
 * EBloc plugin decorator
 *
 * @description
 * The EBlocPlugin decorator is used to define a plugin in the EBloc application.
 * Works as a wrapper for the NestJs Module decorator adding extra metadata for the plugin.
 *
 * A plugin in EBloc is a nestjs module that can be added to the application to extend its functionality.
 * You can add new types and resolvers to the graphql apis, new controllers, services, database entities and ui modules,
 * all of this with the intention of extending the functionality of the application in the way you think is necessary.
 * Here are some examples of what you can do with a plugin:
 * - Extend the storefront api for extra functionality
 * - Add a new ui module to the admin panel to manage a new entity
 * - Notification channel that is subscribed to events in the application
 *
 * @example
 * ```ts
 * \@EBlocPlugin({
 *   uiModules: [WishlistUiModule],
 *   entities: [WishlistEntity],
 * })
 * export class WishlistPlugin {}
 * ```
 */
export function EBlocPlugin(metadata: EBlocPluginMetadata): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    // define metadata of the plugin with Reflect so in other parts of the application we can access it
    Object.values(EBlocPluginMetadataKeys).forEach(property => {
      Reflect.defineMetadata(property, metadata[property], target);
    });

    const moduleInput: ModuleMetadata = {
      controllers: metadata.controllers,
      exports: metadata.exports,
      imports: metadata.imports,
      providers: metadata.providers
    };

    // Only save module metadata, not the plugin metadata
    Module(moduleInput)(target);
  };
}

/**
 * Metadata for the EBlocPlugin decorator
 */
export interface EBlocPluginMetadata extends ModuleMetadata {
  /**
   * Typeorm entities
   *
   * @description
   * entities is the way you can add new tables to the database.
   * To create an entity a good practice is to extend from the EBlocEntity class, this way you can have access to the
   * `id`, `createdAt` and `updatedAt` fields that are automatically managed by the application.
   *
   * @see https://typeorm.io/entities
   *
   * @example
   * ```ts
   * \@TypeOrmEntity('hello-world')
   * export class HelloWorldEntity extends EBlocEntity {
   *   \@Column('varchar')
   *   name: string;
   *
   *   \@Column('boolean', { default: true })
   *   enabled: boolean;
   * }
   * ```
   *
   */
  entities?: any[];
  /**
   * Ui modules
   *
   * @description
   * uiModules is the way you can add new pages to the admin panel.
   * A ui module is an object that contains configuration for sidebar navigation (add a new link to the sidebar menu that points to the new page)
   * and the compiled ui module path (the path to the compiled ui module that will be loaded in the admin panel).
   */
  uiModules?: UiModuleConfig[];
}

export interface UiModuleConfig {
  sidebarNavLink: {
    /**
     * The url where de module ui will be loaded.
     */
    url: string;
    /**
     * The label that will be displayed in the sidebar.
     */
    label: string;
    /**
     * The icon that will be displayed in the sidebar.
     */
    icon: string;
  };
  compiledUiModule: {
    /**
     * This is the URL to the folder that contains the compiled app index.html.
     */
    path: string;
    /**
     * rename your dist folder to a custom name, this name is used to reference the compiled ui module in the admin panel.
     */
    rename: string;
  };
}

export enum EBlocPluginMetadataKeys {
  ENTITIES = 'entities',
  UI_MODULES = 'uiModules'
}
