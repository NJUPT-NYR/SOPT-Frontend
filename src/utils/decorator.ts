import "reflect-metadata";

export function Page(path: string): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata("pagePath", path, target);
    return target;
  };
}

export function RequireAuth(roles?: any[]): ClassDecorator {
  return function (target) {
    Reflect.defineMetadata("roles", roles, target);
    return target;
  };
}
