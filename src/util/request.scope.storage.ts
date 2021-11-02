import * as httpContext from 'express-http-context';
import { Request } from 'express';

const HTTP_CONTEXT_REQUEST_SCOPE = 'HTTP_CONTEXT_REQUEST_SCOPE';
const REQUEST_SCOPE_CLASS_PREFIX = 'REQUEST_SCOPE_CLASS_';

export function isProcessingRequest(): boolean {
    return !!httpContext.get(HTTP_CONTEXT_REQUEST_SCOPE);
}

export function setRequest(request: Request): void {
    httpContext.set(HTTP_CONTEXT_REQUEST_SCOPE, request);
}

export function getRequest(): Request {
    return httpContext.get(HTTP_CONTEXT_REQUEST_SCOPE);
}

export function getOrCreateRequestScopeObject<T>(objectName: string, factory: () => T): T {
    const key = REQUEST_SCOPE_CLASS_PREFIX + objectName;
    let instance = httpContext.get(key);
    if (!instance) {
        instance = factory();
        httpContext.set(key, instance);
    }
    return instance;
}
