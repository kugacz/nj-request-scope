import { dynamicObjectHandler } from './dynamic.object.handler';
import { getRequest } from './request.scope.storage';
import { Request } from 'express';

export function requestScopeFactory(): Request {
    const getInstance = (): Request => getRequest() ?? ({} as any);
    return new Proxy({} as any, dynamicObjectHandler(getInstance));
}
