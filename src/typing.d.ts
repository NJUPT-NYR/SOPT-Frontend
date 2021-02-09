declare module "*.css";

/**
 * server-side-only
 */

/**
 * relative path of static files
 * server side only
 */
declare var STATIC_FILE_PATH: string;

/**
 * fork processes that shares same port
 */
declare var ENALBE_SERVER_CLUSTER: boolean;

/**
 * server port
 */
declare var SERVER_PORT: number;

/**
 * client-side-only
 */

/**
 * render html on server side, inject props into component
 */
declare var __PRERENDER_INIT_PAGE_PROPS__: any;
