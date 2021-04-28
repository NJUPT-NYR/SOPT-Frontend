declare module "*.css";
declare module "*.gif";
declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_ENABLE_MOCK: string;
    API_GATEWAY_URL: string;
    NEXT_PUBLIC_CLIENT_API_GATEWAY_URL: string;
  }
}
