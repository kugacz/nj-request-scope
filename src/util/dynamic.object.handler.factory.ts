// this high abstract handler implements ProxyHandler, and TSLints tries to force more detailed typing
/* eslint-disable @typescript-eslint/ban-types */
export function createDynamicObjectHandler<T extends object>(instanceResolver: () => T): ProxyHandler<T> {
    return {
        apply(target: T, thisArg: any, argArray: Array<any>): any {
            throw new NotImplementedException();
        },
        construct(target: T, argArray: Array<any>, newTarget: Function): object {
            throw new NotImplementedException();
        },
        defineProperty(target: T, p: string | symbol, attributes: PropertyDescriptor): boolean {
            throw new NotImplementedException();
        },
        deleteProperty(target: T, p: string | symbol): boolean {
            throw new NotImplementedException();
        },
        get(target: T, p: string | symbol, receiver: any): any {
            return instanceResolver()[p];
        },
        getOwnPropertyDescriptor(target: T, p: string | symbol): PropertyDescriptor | undefined {
            return Object.getOwnPropertyDescriptor(instanceResolver(), p);
        },
        getPrototypeOf(target: T): object | null {
            return Object.getPrototypeOf(instanceResolver());
        },
        has(target: T, p: string | symbol): boolean {
            return !!instanceResolver()[p];
        },
        isExtensible(target: T): boolean {
            throw new NotImplementedException();
        },
        ownKeys(target: T): ArrayLike<string | symbol> {
            return Object.keys(instanceResolver());
        },
        preventExtensions(target: T): boolean {
            throw new NotImplementedException();
        },
        set(target: T, p: string | symbol, value: any, receiver: any): boolean {
            return (instanceResolver()[p] = value);
        },
        setPrototypeOf(target: T, v: object | null): boolean {
            throw new NotImplementedException();
        },
    };
}

class NotImplementedException extends Error {
    constructor(message?: string) {
        message ??= 'Not implemented. Feel free to implement.';
        super(message);
    }
}
