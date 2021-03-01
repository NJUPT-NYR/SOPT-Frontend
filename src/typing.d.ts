declare module "*.css";
declare module "*.gif";

declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: number;
    NEXT_PUBLIC_ENABLE_MOCK: boolean;
    API_GATEWAY_URL: string;
    NEXT_PUBLIC_CLIENT_API_GATEWAY_URL: string;
  }
}
