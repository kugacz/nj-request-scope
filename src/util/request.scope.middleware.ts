import * as httpContext from 'express-http-context';
import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { setRequest } from './request.scope.storage';

@Injectable()
export class RequestScopeMiddleware implements NestMiddleware {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    use(req: Request, res: Response, next: NextFunction): void {
        httpContext.middleware(req, res, () => {
            setRequest(req);
            next();
        });
    }
}
