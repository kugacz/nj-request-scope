import { createDynamicObjectHandler } from './dynamic.object.handler.factory';
import { getRequest } from './request.scope.storage';
import { Request } from 'express';

export function requestScopeFactory(): Request {
    const getInstance = (): Request => getRequest() ?? ({} as any);
    return new Proxy({} as any, createDynamicObjectHandler(getInstance));
}
