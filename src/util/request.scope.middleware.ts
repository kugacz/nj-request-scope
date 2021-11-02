import * as httpContext from 'express-http-context';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { setRequest } from './request.scope.storage';

@Injectable()
export class RequestScopeMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        httpContext.middleware(req, res, () => {
            setRequest(req);
            next();
        });
    }
}
