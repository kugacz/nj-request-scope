import { createDynamicObjectHandler } from './util/dynamic.object.handler.factory';
import { getOrCreateRequestScopeObject, isProcessingRequest } from './util/request.scope.storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Constructor<T> = new (...args: Array<any>) => any;

export function RequestScope(): <T extends Constructor<T>>(constructor: T) => T {
    return <T extends Constructor<T>>(constructor: T): T => {
        const requestScopeConstructor = prepareRequestScopeConstructor(constructor);
        copyObjectInformation(constructor, requestScopeConstructor);
        return requestScopeConstructor as any;
    };
}

function prepareRequestScopeConstructor<T extends Constructor<T>>(constructor: T): (...args) => T {
    let defaultInstance = null;
    // Arrow functions can not be used as constructors
    // tslint:disable-next-line:only-arrow-functions
    return function (...args): T {
        const getInstance = (): T => {
            if (!isProcessingRequest()) {
                return (defaultInstance ??= new constructor(...args));
            }
            return getOrCreateRequestScopeObject(constructor.prototype.constructor.name, () => new constructor(...args));
        };
        return new Proxy({} as any, createDynamicObjectHandler(getInstance));
    };
}

function copyObjectInformation(source: any, target: any): void {
    copyObjectName(target, source);
    target.prototype = source.prototype;
    copyReflectValues(source, target, Reflect.getMetadataKeys, Reflect.getMetadata, Reflect.defineMetadata);
}

function copyObjectName(target: any, source: any): void {
    Object.defineProperty(target, 'name', {
        value: source.prototype.constructor.name,
        writable: false,
    });
}

function copyReflectValues(
    source: any,
    target: any,
    keys: (target: Record<string, unknown>) => Array<any>,
    getter: (metadataKey: any, source: Record<string, unknown>) => any,
    setter: (metadataKey: any, metadataValue: any, target: Record<string, unknown>) => void,
): void {
    keys(source).forEach((key) => {
        setter(key, getter(key, source), target);
    });
}
