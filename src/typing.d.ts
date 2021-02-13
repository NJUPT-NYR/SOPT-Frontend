declare module "*.css";
declare module "*.gif";

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
 * enable mock
 */
declare var ENABLE_MOCK: boolean;

declare var API_GATEWAY_URL: string;

/**
 * render html on server side, inject props into component
 */
declare var __PRERENDER_INIT_PAGE_PROPS__: any;
