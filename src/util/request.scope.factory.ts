/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-return */
import { createDynamicObjectHandler } from './dynamic.object.handler.factory';
import { getRequest } from './request.scope.storage';
import type { Request } from 'express';

export function requestScopeFactory(): Request {
    const getInstance = (): Request => getRequest() ?? ({} as any);
    return new Proxy({} as any, createDynamicObjectHandler(getInstance));
}
