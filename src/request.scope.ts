/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-return,  @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/max-params */
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

    return function (...args): T {
        const getInstance = (): T => {
            if (!isProcessingRequest()) {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                return (defaultInstance ??= new constructor(...args));
            }
            return getOrCreateRequestScopeObject(constructor.prototype.constructor.name, () => new constructor(...args));
        };
        return new Proxy({} as any, createDynamicObjectHandler(getInstance));
    };
}

function copyObjectInformation(source: any, target: any): void {
    copyObjectName(target, source);
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring, @typescript-eslint/no-unsafe-assignment
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
